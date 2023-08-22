use chatter::{init_log, router::create_router};
use sqlx::mysql::MySqlPoolOptions;

#[tokio::main]
async fn main() {
    init_log();

    let pool = MySqlPoolOptions::new()
        .connect_lazy("mysql://root:mysql@localhost:20353/mysql")
        .unwrap();
    let app = create_router(pool).await;
    axum::Server::bind(&"0.0.0.0:8000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
