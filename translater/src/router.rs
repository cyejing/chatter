use axum::{
    response::{IntoResponse, Response},
    routing::get,
    Router,
};
use http::{
    header::{self, ACCEPT, AUTHORIZATION, ORIGIN},
    Method, StatusCode, Uri,
};
use rust_embed::RustEmbed;

use tower_http::cors::{AllowOrigin, CorsLayer};

use sqlx::MySqlPool;

#[derive(Clone)]
pub struct AppState {
    pub pool: MySqlPool,
}
pub async fn create_router(pool: MySqlPool) -> Router {
    let state = AppState { pool };

    let api_router = create_api_router(state);

    Router::new()
        .nest("/api", api_router)
        .fallback_service(get(static_handler))
}

pub fn create_api_router(state: AppState) -> Router {
    let cors = CorsLayer::new()
        .allow_methods(vec![Method::GET, Method::POST, Method::PUT, Method::DELETE])
        .allow_headers(vec![ORIGIN, AUTHORIZATION, ACCEPT])
        .allow_origin(AllowOrigin::any());

    // let payments_router = Router::new().route("/pay", post(create_checkout));

    // let customers_router = Router::new()
    //     .route("/", post(get_all_customers))
    //     .route("/names", post(get_customer_names))
    //     .route(
    //         "/:id",
    //         post(get_one_customer)
    //             .put(edit_customer)
    //             .delete(destroy_customer),
    //     )
    //     .route("/create", post(create_customer));

    // let deals_router = Router::new()
    //     .route("/", post(get_all_deals))
    //     .route(
    //         "/:id",
    //         post(get_one_deal).put(edit_deal).delete(destroy_deal),
    //     )
    //     .route("/create", post(create_deal));

    // let auth_router = Router::new()
    //     .route("/register", post(register))
    //     .route("/login", post(login))
    //     .route("/logout", get(logout));

    Router::new()
        // .nest("/customers", customers_router)
        // .nest("/deals", deals_router)
        // .nest("/payments", payments_router)
        // .route("/dashboard", post(get_dashboard_data))
        // .layer(middleware::from_fn_with_state(
        // state.clone(),
        // validate_session,
        // ))
        // .nest("/auth", auth_router)
        // .route("/subscribe", post(subscribe))
        .route("/health", get(hello_world))
        .with_state(state)
        .layer(cors)
}

pub async fn hello_world() -> &'static str {
    "Hello world!"
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
