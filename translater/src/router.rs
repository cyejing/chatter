use std::path::PathBuf;

use axum::{
    body::{boxed, Body},
    response::Response,
    routing::get,
    Router,
};
use http::{
    header::{ACCEPT, AUTHORIZATION, ORIGIN},
    Method, StatusCode,
};
use tower::ServiceExt;
use tower_http::{
    cors::{AllowOrigin, CorsLayer},
    services::ServeDir,
};

use sqlx::MySqlPool;

#[derive(Clone)]
pub struct AppState {
    pub pool: MySqlPool,
}
pub async fn create_router(pool: MySqlPool, public: PathBuf) -> Router {
    let state = AppState { pool };

    let api_router = create_api_router(state);

    Router::new()
        .nest("/api", api_router)
        .fallback_service(get(|req| async move {
            match ServeDir::new(public).oneshot(req).await {
                Ok(res) => res.map(boxed),
                Err(err) => Response::builder()
                    .status(StatusCode::INTERNAL_SERVER_ERROR)
                    .body(boxed(Body::from(format!("error: {err}"))))
                    .expect("error response"),
            }
        }))
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
