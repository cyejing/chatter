use axum::{
    response::{IntoResponse, Response},
    routing::{get, post},
    Router,
};
use http::{header, StatusCode, Uri};
use rust_embed::RustEmbed;

use tower_http::trace::{self, TraceLayer};
use tracing::Level;

use crate::translate::translate;

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
        .route("/translate", post(translate))
        .route("/health", get(health))
        .with_state(state)
        .layer(
            TraceLayer::new_for_http()
                .make_span_with(trace::DefaultMakeSpan::new().level(Level::INFO))
                .on_response(trace::DefaultOnResponse::new().level(Level::INFO)),
        )
}

pub async fn health() -> &'static str {
    "I am Ok"
}

async fn static_handler(uri: Uri) -> impl IntoResponse {
    let path = uri.path().trim_start_matches('/').to_string();

    StaticFile(path)
}

#[derive(RustEmbed)]
#[folder = "public/"]
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
