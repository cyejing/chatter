use axum::{
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use chatter_core::{
    text_recognize::{self, RecognizeReq, RecognizeResp},
    translate::{self, TranslateReq, TranslateResp},
};
use http::{header, StatusCode, Uri};
use rust_embed::RustEmbed;

#[derive(Clone)]
pub struct AppState {}

pub async fn create_router() -> Router {
    let state = AppState {};

    let api_router = create_api_router(state);

    Router::new()
        .nest("/api", api_router)
        .fallback_service(get(static_handler))
}

pub fn create_api_router(state: AppState) -> Router {
    Router::new()
        .route("/health", get(health))
        .route("/translate", post(translate))
        .route("/recognize", post(recognize))
        .with_state(state)
}

async fn health() -> &'static str {
    "I am Ok"
}

async fn translate(req: Json<TranslateReq>) -> Json<TranslateResp> {
    let a = Json(translate::translate(req.0).await.unwrap());
    a
}

async fn recognize(req: Json<RecognizeReq>) -> Json<RecognizeResp> {
    Json(text_recognize::recognize(req.0))
}

async fn static_handler(uri: Uri) -> impl IntoResponse {
    let path = uri.path().trim_start_matches('/').to_string();

    StaticFile(path)
}

#[derive(RustEmbed)]
#[folder = "../dist"]
struct Asset;

pub struct StaticFile<T>(pub T);

impl<T> IntoResponse for StaticFile<T>
where
    T: Into<String>,
{
    fn into_response(self) -> Response {
        let path = self.0.into();
        let file_path = path.as_str();
        match Asset::get(file_path) {
            Some(content) => {
                let mime = mime_guess::from_path(path).first_or_octet_stream();
                ([(header::CONTENT_TYPE, mime.as_ref())], content.data).into_response()
            }
            None => {
                if file_path.trim() == "" || file_path.trim().ends_with('/') {
                    let index_html = format!("{file_path}index.html");
                    if let Some(ct) = Asset::get(&index_html) {
                        let mime = mime_guess::from_path(index_html).first_or_octet_stream();
                        return ([(header::CONTENT_TYPE, mime.as_ref())], ct.data).into_response();
                    }
                }
                (StatusCode::NOT_FOUND, "404 Not Found").into_response()
            }
        }
    }
}
