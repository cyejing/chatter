// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use time::macros::{format_description, offset};
use tracing_subscriber::fmt::time::OffsetTime;
use translate::{TranslateReq, TranslateResp};

mod translate;

fn main() {
    init_log();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![my_custom_command, translate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

pub fn init_log() {
    let timer = OffsetTime::new(
        offset!(+8),
        format_description!("[year]-[month]-[day]T[hour]:[minute]:[second].[subsecond digits:3]+[offset_hour][offset_minute]")
    );
    tracing_subscriber::fmt()
        .with_target(false)
        .with_timer(timer)
        .init();
}

#[tauri::command]
fn my_custom_command(invoke_message: String) -> String {
    println!(
        "I was invoked from JS, with this message: {}",
        invoke_message
    );
    "i get".to_string()
}

#[tauri::command]
async fn translate(req: TranslateReq) -> Result<TranslateResp, String> {
    match translate::translate(req).await {
        Ok(r) => Ok(r),
        Err(e) => Err(format!("{e}")),
    }
}
