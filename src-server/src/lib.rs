use time::macros::{format_description, offset};
use tracing::Level;
use tracing_subscriber::fmt::time::OffsetTime;

pub mod router;


pub fn init_log() {
    let timer = OffsetTime::new(
        offset!(+8),
        format_description!("[year]-[month]-[day]T[hour]:[minute]:[second].[subsecond digits:3]+[offset_hour][offset_minute]")
    );
    tracing_subscriber::fmt()
        .with_target(false)
        .with_timer(timer)
        .with_max_level(Level::INFO)
        .init();
}
