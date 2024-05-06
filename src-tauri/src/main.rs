// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use chatter_core::{
    text_recognize::{self, RecognizeReq, RecognizeResp},
    translate::{self, TranslateReq, TranslateResp},
};
use time::macros::{format_description, offset};
use tracing::Level;
use tracing_subscriber::fmt::time::OffsetTime;

fn main() {
    init_log();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![translate, recognize])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
async fn translate(req: TranslateReq) -> Result<TranslateResp, String> {
    translate::translate(req).await
}

#[tauri::command]
fn recognize(req: RecognizeReq) -> RecognizeResp {
    text_recognize::recognize(req)
}

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
