use chatter::{init_log, router::create_router};
use log::info;

#[tokio::main]
async fn main() {
    init_log();

    let addr = "0.0.0.0:8000";
    let app = create_router().await;
    info!("Listen server {addr}");
    axum::Server::bind(&addr.parse().expect("parse address failed"))
        .serve(app.into_make_service())
        .await
        .unwrap();
}
