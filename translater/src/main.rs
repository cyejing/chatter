use chatter::router::create_router;
use sqlx::MySqlPool;
use std::path::PathBuf;

#[shuttle_runtime::main]
async fn axum(
    #[shuttle_aws_rds::MySql] pool: MySqlPool,
    #[shuttle_static_folder::StaticFolder(folder = "public")] public: PathBuf,
) -> shuttle_axum::ShuttleAxum {
    let app = create_router(pool, public).await;
    Ok(app.into())
}
