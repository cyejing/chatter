use chatter_server::router::create_router;

#[shuttle_runtime::main]
async fn main() -> shuttle_axum::ShuttleAxum {
    let app = create_router().await;
    Ok(app.into())
}
