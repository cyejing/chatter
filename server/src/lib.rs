pub mod router;
pub mod translate;

pub fn init_log() {
    tracing_subscriber::fmt()
        .with_target(false)
        .compact()
        .init();
}
