mod router;
use axum::body::{boxed, Body};
use axum::{response::Response, routing::get, Router};
use http::StatusCode;
use router::create_api_router;
use sqlx::MySqlPool;
use std::path::PathBuf;
use tower::ServiceExt;
use tower_http::services::ServeDir;

#[derive(Clone)]
pub struct AppState {
    pub pool: MySqlPool,
}

#[shuttle_runtime::main]
async fn axum(
    #[shuttle_aws_rds::MySql] pool: MySqlPool,
    #[shuttle_static_folder::StaticFolder(folder = "public")] public: PathBuf,
) -> shuttle_axum::ShuttleAxum {
    let state = AppState { pool };

    let api_router = create_api_router(state);

    let router = Router::new()
        .nest("/api", api_router)
        .fallback_service(get(|req| async move {
            match ServeDir::new(public).oneshot(req).await {
                Ok(res) => res.map(boxed),
                Err(err) => Response::builder()
                    .status(StatusCode::INTERNAL_SERVER_ERROR)
                    .body(boxed(Body::from(format!("error: {err}"))))
                    .expect("error response"),
            }
        }));

    Ok(router.into())
}
