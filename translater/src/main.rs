use std::path::PathBuf;

use chatter::router::create_router;
use sqlx::MySqlPool;

#[shuttle_runtime::main]
async fn axum(
    #[shuttle_aws_rds::MySql] pool: MySqlPool,
    #[shuttle_static_folder::StaticFolder(folder = "public")] _public: PathBuf,
) -> shuttle_axum::ShuttleAxum {
    let app = create_router(pool).await;
    Ok(app.into())
}
