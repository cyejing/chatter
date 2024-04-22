pub mod utils;

use chatter_core::{
    text_recognize::{self, RecognizeReq},
    translate::{self, TranslateReq},
};
use gloo_utils::format::JsValueSerdeExt as _;
use utils::set_panic_hook;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {

    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn wasm_init() {
    log("Hello, Wasm!");
    set_panic_hook();
}

#[wasm_bindgen]
pub async fn translate(val: JsValue) -> JsValue {
    let req: TranslateReq = val.into_serde().unwrap();
    log(&format!("wasm translate req: {req:?}"));
    let resp = translate::translate(req).await;
    log(&format!("wasm translate resp: {resp:?}"));
    JsValue::from_serde(&resp).unwrap()
}

#[wasm_bindgen]
pub fn recognize(val: JsValue) -> JsValue {
    let req: RecognizeReq = val.into_serde().unwrap();
    log(&format!("wasm req: {req:?}"));
    let resp = text_recognize::recognize(req);
    log(&format!("wasm resp: {resp:?}"));
    JsValue::from_serde(&resp).unwrap()
}
