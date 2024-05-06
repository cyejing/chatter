use chatter_core::{
    text_recognize::{self, RecognizeReq},
    translate::{self, TranslateReq},
};
use gloo_utils::format::JsValueSerdeExt as _;
use log::{info, Level};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn wasm_init() {
    console_error_panic_hook::set_once();
    let _ = console_log::init_with_level(Level::Info);
    info!("Hello, Wasm!");
}

#[wasm_bindgen]
pub async fn translate(val: JsValue) -> JsValue {
    let req: TranslateReq = val.into_serde().unwrap();
    let resp = translate::translate(req).await;
    JsValue::from_serde(&resp).unwrap()
}

#[wasm_bindgen]
pub fn recognize(val: JsValue) -> JsValue {
    let req: RecognizeReq = val.into_serde().unwrap();
    let resp = text_recognize::recognize(req);
    JsValue::from_serde(&resp).unwrap()
}
