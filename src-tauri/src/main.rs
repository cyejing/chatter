// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use translate::{TranslateReq, TranslateResp};

mod translate;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![my_custom_command, translate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
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
    println!("translate: {req:?}");
    match translate::translate(req).await {
        Ok(r) => Ok(r),
        Err(e) => Err(format!("{e}")),
    }
}
