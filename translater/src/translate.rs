use axum::{
    response::{IntoResponse, Response},
    Json,
};
use http::StatusCode;
use lazy_static::lazy_static;

use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct TranslateReq {
    provider: String,
    q: String,
    #[serde(default = "default_from")]
    from: String,
    to: String,
}

#[derive(Serialize)]
pub struct TranslateResp {
    provider: String,
    q: String,
    trans: String,
    from: String,
    to: String,
}

fn default_from() -> String {
    "auto".to_string()
}

pub async fn translate(req: Json<TranslateReq>) -> Response {
    match req.provider.as_str() {
        "google" => google_translate(req).await.unwrap().into_response(),
        _ => (
            StatusCode::BAD_REQUEST,
            format!("unknown provider {}", req.provider),
        )
            .into_response(),
    }
}

lazy_static! {
    static ref CLIENT: Client = reqwest::ClientBuilder::new()
        .build()
        .expect("reqwest client build err");
}

async fn google_translate(req: Json<TranslateReq>) -> anyhow::Result<Json<TranslateResp>> {
    let resp: Vec<Vec<String>> = CLIENT
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
        .cloned()
        .unwrap_or_default();
    Ok(Json(TranslateResp {
        provider: req.provider.clone(),
        q: req.q.clone(),
        to: req.to.clone(),
        from: req.from.clone(),
        trans,
    }))
}
