use anyhow::anyhow;
use log::info;
use once_cell::sync::Lazy;
use reqwest::{
    header::{self, HeaderValue},
    Client,
};
use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Deserialize)]
pub struct TranslateReq {
    provider: String,
    q: String,
    #[serde(default = "default_from")]
    from: String,
    to: String,
}

#[derive(Debug, Default, Serialize)]
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

#[allow(dead_code)]
pub async fn translate(req: TranslateReq) -> anyhow::Result<TranslateResp> {
    info!("translate {req:?}");
    match req.provider.as_str() {
        "google" => google_translate(req).await,
        "googleb" => google_translate_back(req).await,
        _ => Err(anyhow!(format!("unknown provider {}", req.provider))),
    }
}

static CLIENT: Lazy<Client> = Lazy::new(|| {
    reqwest::ClientBuilder::new()
        .build()
        .expect("reqwest client build failed")
});

// https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=zh-CN&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=sos&dt=ss&dt=t&q=accessible&tk=592148.929806
async fn google_translate(req: TranslateReq) -> anyhow::Result<TranslateResp> {
    let resp: Value = CLIENT
        .get("https://translate.googleapis.com/translate_a/single")
        .header(header::ACCEPT, HeaderValue::from_static("application/json"))
        .header(header::USER_AGENT, HeaderValue::from_static("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"))
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

    let trans = resp
        .get(0)
        .and_then(|v| v.get(0))
        .and_then(|v| v.get(0))
        .and_then(|v| v.as_str())
        .map(|a| a.to_string())
        .unwrap_or_default();
    let trans_detail = vec![
        resp.get(1)
            .and_then(|v| v.get(0))
            .and_then(|v| v.get(0))
            .and_then(|v| v.as_str())
            .map(|a| a.to_string())
            .unwrap_or_default(),
        resp.get(1)
            .and_then(|v| v.get(0))
            .and_then(|v| v.get(1))
            .and_then(|v| v.get(0))
            .and_then(|v| v.as_str())
            .map(|a| a.to_string())
            .unwrap_or_default(),
        resp.get(1)
            .and_then(|v| v.get(0))
            .and_then(|v| v.get(1))
            .and_then(|v| v.get(1))
            .and_then(|v| v.as_str())
            .map(|a| a.to_string())
            .unwrap_or_default(),
    ];
    let trans_detail2 = vec![
        resp.get(5)
            .and_then(|v| v.get(0))
            .and_then(|v| v.get(2))
            .and_then(|v| v.get(0))
            .and_then(|v| v.get(0))
            .and_then(|v| v.as_str())
            .map(|a| a.to_string())
            .unwrap_or_default(),
        resp.get(5)
            .and_then(|v| v.get(0))
            .and_then(|v| v.get(2))
            .and_then(|v| v.get(1))
            .and_then(|v| v.get(0))
            .and_then(|v| v.as_str())
            .map(|a| a.to_string())
            .unwrap_or_default(),
    ];

    Ok(TranslateResp {
        provider: req.provider.clone(),
        q: req.q.clone(),
        to: req.to.clone(),
        from: req.from.clone(),
        trans,
        trans_detail,
        trans_detail2,
    })
}
async fn google_translate_back(req: TranslateReq) -> anyhow::Result<TranslateResp> {
    let resp: Value = CLIENT
        .get("https://translate.googleapis.com/translate_a/t")
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
    let trans = resp
        .get(0)
        .and_then(|v| v.get(0))
        .and_then(|v| v.as_str())
        .map(|a| a.to_string())
        .unwrap_or_default();
    Ok(TranslateResp {
        provider: req.provider.clone(),
        q: req.q.clone(),
        to: req.to.clone(),
        from: req.from.clone(),
        trans,
        ..Default::default()
    })
}

#[cfg(test)]
mod tests {
    use crate::translate::{google_translate, google_translate_back, TranslateReq};

    #[tokio::test]
    #[ignore = "reason"]
    async fn google_translate_back_test() {
        let req = TranslateReq {
            provider: "google".to_string(),
            from: "auto".to_string(),
            to: "zh-cn".to_string(),
            // q: "accessible".to_string(),
            q: "Square button with a 1:1 ratio".to_string(),
        };
        let resp = google_translate_back(req).await;
        println!("resp: {resp:?}");
    }

    #[tokio::test]
    #[ignore = "reason"]
    async fn google_translate_test() {
        let req = TranslateReq {
            provider: "google".to_string(),
            from: "auto".to_string(),
            to: "zh-CN".to_string(),
            // q: "accessible".to_string(),
            q: "Square button with a 1:1 ratio".to_string(),
        };
        let resp = google_translate(req).await;
        println!("resp2: {resp:?}");
    }
}
