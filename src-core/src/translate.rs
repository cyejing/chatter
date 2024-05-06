use instant::{Duration, Instant};
use std::sync::Mutex;

use anyhow::anyhow;
use cached::proc_macro::cached;
use log::{error, info};
use once_cell::sync::Lazy;
use reqwest::{
    header::{self, HeaderValue},
    Client,
};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Debug, Clone, Deserialize)]
pub struct TranslateReq {
    provider: String,
    q: String,
    to: String,
    #[serde(default = "default_from")]
    from: String,
}

#[derive(Debug, Clone, Default, Serialize)]
pub struct TranslateResp {
    provider: String,
    q: String,
    from: String,
    to: String,
    trans: String,
    trans_detail: Vec<String>,
    trans_detail2: Vec<String>,
}

fn default_from() -> String {
    "auto".to_string()
}

static CLIENT: Lazy<Client> = Lazy::new(|| {
    let builder = reqwest::ClientBuilder::new();
    #[cfg(not(target_arch = "wasm32"))]
    let builder = builder.connect_timeout(Duration::from_secs(3));
    #[cfg(not(target_arch = "wasm32"))]
    let builder = builder.timeout(Duration::from_secs(5));

    builder.build().expect("reqwest client build failed")
});

static MICROSOFT_TOKEN: Lazy<Mutex<MicrosoftToken>> = Lazy::new(|| {
    Mutex::new(MicrosoftToken {
        token: String::default(),
        apply_at: Instant::now(),
    })
});

const UA: HeaderValue = HeaderValue::from_static("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");

#[derive(Debug, Clone)]
struct MicrosoftToken {
    token: String,
    apply_at: Instant,
}

#[cached(
    time = 300,
    size = 3000,
    result = true,
    key = "String",
    convert = r##"{ format!("{}{}{}",req.q, req.to, req.from) }"##
)]
pub async fn translate(req: TranslateReq) -> Result<TranslateResp, String> {
    info!("translate req:{req:?}");
    let ret = match req.provider.as_str() {
        "google" => google_translate(req).await,
        "googleb" => google_translate_back(req).await,
        "microsoft" => microsoft_translate(req).await,
        _ => Err(anyhow!(format!("unknown provider {}", req.provider))),
    };
    match ret {
        Ok(resp) => {
            info!("translate resp:{resp:?}");
            Ok(resp)
        }
        Err(e) => {
            error!("translate err:{e:?}");
            Err(format!("{e}"))
        }
    }
}

async fn microsoft_translate(req: TranslateReq) -> anyhow::Result<TranslateResp> {
    let mut last_token = MICROSOFT_TOKEN.lock().unwrap().clone();
    if last_token.token.is_empty() || last_token.apply_at.elapsed().as_secs() > 60 * 9 {
        last_token = if let Some(new_token) = microsoft_apply_token().await {
            info!("apply new_token");
            let mut token_guard = MICROSOFT_TOKEN.lock().unwrap();
            *token_guard = new_token.clone();
            new_token
        } else {
            return Err(anyhow!("microsoft apply token failed"));
        };
    }
    let token = last_token.token;
    let body: Value = CLIENT
        .post("https://api-edge.cognitive.microsofttranslator.com/translate")
        .query(&[("to", req.to.as_str()), ("api-version", "3.0")])
        .header(header::ACCEPT, HeaderValue::from_static("application/json"))
        .header(header::USER_AGENT, UA)
        .header(
            header::ACCEPT_LANGUAGE,
            HeaderValue::from_static("zh-CN,zh;q=0.9"),
        )
        .header(header::AUTHORIZATION, token)
        .json(&json!([{"Text":req.q}]))
        .send()
        .await?
        .json()
        .await?;
    info!("microsoft translate body: {body}");

    let text = body
        .get(0)
        .and_then(|v| v.get("translations"))
        .and_then(|v| v.get(0))
        .and_then(|v| v.get("text"))
        .and_then(|v| v.as_str())
        .map(|s| s.to_string())
        .unwrap_or_default();
    Ok(TranslateResp {
        provider: req.provider,
        q: req.q,
        from: req.from,
        to: req.to,
        trans: text,
        ..Default::default()
    })
}

async fn microsoft_apply_token() -> Option<MicrosoftToken> {
    let body = CLIENT
        .get("https://edge.microsoft.com/translate/auth")
        .header(header::ACCEPT, HeaderValue::from_static("application/json"))
        .header(header::USER_AGENT, UA)
        .header(
            header::ACCEPT_LANGUAGE,
            HeaderValue::from_static("zh-CN,zh;q=0.9"),
        )
        .send()
        .await
        .ok()?
        .text()
        .await
        .ok()?;
    Some(MicrosoftToken {
        token: body,
        apply_at: Instant::now(),
    })
}

/// google translate
/// eg: https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=sos&dt=ss&dt=t&q=accessible&tk=592148.929806
async fn google_translate(req: TranslateReq) -> anyhow::Result<TranslateResp> {
    let body: Value = CLIENT
        .get("https://translate.googleapis.com/translate_a/single")
        .header(header::ACCEPT, HeaderValue::from_static("application/json"))
        .header(header::USER_AGENT, UA)
        .header(
            header::ACCEPT_LANGUAGE,
            HeaderValue::from_static("zh-CN,zh;q=0.9"),
        )
        .query(&[
            ("client", "gtx"),
            ("sl", &req.from),
            ("tl", &req.to),
            ("q", &req.q),
            ("dt", "t"),
            ("dt", "at"),
            ("dt", "bd"),
            ("dt", "ex"),
            ("dt", "ld"),
            ("dt", "md"),
            ("dt", "qca"),
            ("dt", "rw"),
            ("dt", "rm"),
            ("dt", "sos"),
            ("dt", "ss"),
        ])
        .send()
        .await?
        .json()
        .await?;

    info!("google translate body: {body}");

    let trans = body
        .get(0)
        .and_then(|v| v.get(0))
        .and_then(|v| v.get(0))
        .and_then(|v| v.as_str())
        .map(|a| a.to_string())
        .unwrap_or_default();
    let trans_detail = vec![
        body.get(1)
            .and_then(|v| v.get(0))
            .and_then(|v| v.get(0))
            .and_then(|v| v.as_str())
            .map(|a| a.to_string())
            .unwrap_or_default(),
        body.get(1)
            .and_then(|v| v.get(0))
            .and_then(|v| v.get(1))
            .and_then(|v| v.get(0))
            .and_then(|v| v.as_str())
            .map(|a| a.to_string())
            .unwrap_or_default(),
        body.get(1)
            .and_then(|v| v.get(0))
            .and_then(|v| v.get(1))
            .and_then(|v| v.get(1))
            .and_then(|v| v.as_str())
            .map(|a| a.to_string())
            .unwrap_or_default(),
    ];
    let trans_detail2 = vec![
        body.get(5)
            .and_then(|v| v.get(0))
            .and_then(|v| v.get(2))
            .and_then(|v| v.get(0))
            .and_then(|v| v.get(0))
            .and_then(|v| v.as_str())
            .map(|a| a.to_string())
            .unwrap_or_default(),
        body.get(5)
            .and_then(|v| v.get(0))
            .and_then(|v| v.get(2))
            .and_then(|v| v.get(1))
            .and_then(|v| v.get(0))
            .and_then(|v| v.as_str())
            .map(|a| a.to_string())
            .unwrap_or_default(),
    ];

    Ok(TranslateResp {
        provider: req.provider,
        q: req.q,
        to: req.to,
        from: req.from,
        trans,
        trans_detail,
        trans_detail2,
    })
}
async fn google_translate_back(req: TranslateReq) -> anyhow::Result<TranslateResp> {
    let body: Value = CLIENT
        .get("https://translate.googleapis.com/translate_a/t")
        .header(header::ACCEPT, HeaderValue::from_static("application/json"))
        .header(header::USER_AGENT, UA)
        .header(
            header::ACCEPT_LANGUAGE,
            HeaderValue::from_static("zh-CN,zh;q=0.9"),
        )
        .query(&[
            ("client", "dict-chrome-ex"),
            ("sl", &req.from),
            ("tl", &req.to),
            ("q", &req.q),
        ])
        .send()
        .await?
        .json()
        .await?;

    info!("google_back translate body: {body}");

    let trans = body
        .get(0)
        .and_then(|v| v.get(0))
        .and_then(|v| v.as_str())
        .map(|a| a.to_string())
        .unwrap_or_default();
    Ok(TranslateResp {
        provider: req.provider,
        q: req.q,
        to: req.to,
        from: req.from,
        trans,
        ..Default::default()
    })
}

#[cfg(test)]
mod tests {
    use crate::translate::{translate, TranslateReq};

    #[tokio::test]
    #[ignore = "reason"]
    async fn google_translate_back_test() {
        let req = TranslateReq {
            provider: "googleb".to_string(),
            from: "auto".to_string(),
            to: "zh-CN".to_string(),
            q: "accessible".to_string(),
            // q: "Square button with a 1:1 ratio".to_string(),
        };
        let resp = translate(req).await;
        println!("resp: {resp:?}");
    }

    #[tokio::test]
    #[ignore = "reason"]
    async fn google_translate_test() {
        let req = TranslateReq {
            provider: "google".to_string(),
            from: "auto".to_string(),
            to: "zh-CN".to_string(),
            q: "accessible".to_string(),
            // q: "Square button with a 1:1 ratio".to_string(),
        };
        let resp = translate(req).await;
        println!("resp: {resp:?}");
    }

    #[tokio::test]
    #[ignore = "reason"]
    async fn microsoft_translate_test() {
        let req = TranslateReq {
            provider: "microsoft".to_string(),
            from: "auto".to_string(),
            to: "zh-CN".to_string(),
            q: "accessible".to_string(),
            // q: "Square button with a 1:1 ratio".to_string(),
        };
        let resp = translate(req).await;
        println!("resp: {resp:?}");
    }
}
