use chatter::{init_log, router::create_router};
use sqlx::mysql::MySqlPoolOptions;

#[tokio::main]
async fn main() {
    init_log();

    let app = create_router().await;
    axum::Server::bind(&"0.0.0.0:8000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
