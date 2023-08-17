use std::path::PathBuf;

use chatter::router::create_router;
use sqlx::mysql::MySqlPoolOptions;

#[tokio::main]
async fn main() {
    let public = PathBuf::from("public");
    let pool = MySqlPoolOptions::new()
        .connect_lazy("mysql://root:mysql@localhost:20353/mysql")
        .unwrap();
    let app = create_router(pool, public).await;
    axum::Server::bind(&"0.0.0.0:8001".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
