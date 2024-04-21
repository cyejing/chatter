use chatter_server::{init_log, router::create_router};
use log::info;

#[tokio::main]
async fn main() {
    init_log();

    let addr = "0.0.0.0:8000";
    let app = create_router().await;

    info!("Listen server {addr}");
    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("bind addr failed");
    axum::serve(listener, app)
        .await
        .expect("axum server failed");
}
