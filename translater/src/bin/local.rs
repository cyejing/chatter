use std::path::PathBuf;

use chatter::router::create_router;
use sqlx::mysql::MySqlPoolOptions;

#[tokio::main]
async fn main() {
    let public = PathBuf::from("public");
    let pool = MySqlPoolOptions::new()
        .connect_lazy(
            "mysql://didi_cQQP:6CCT2do1U@10.78.133.3:3127/im_dichat?characterEncoding=UTF-8",
        )
        .unwrap();
    let app = create_router(pool, public).await;
    axum::Server::bind(&"0.0.0.0:8001".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
