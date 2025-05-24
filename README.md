# Chatter 
英语阅读，用键盘敲打出翻译, 新的英语阅读方式

## 技术栈
React + Rust + Tauri + WASM + Axum Server

多种运行方式:
1. 静态页面 + WASM
2. 服务端模式 + Axum Server
3. 桌面端 + Tauri


## 运行必备

### WASM
1. `cargo install wasm-pack`
1. `cargo install rsw`

### Tauri
1. `cargo install cargo-tauri`

### Shuttle
1. `cargo install cargo-shuttle`

### 构建wasm pack
`pnpm run rsw build`

## 开发

1. 服务端模式
`pnpm run devser`
2. tauri模式
`pnpm run tauri dev`
2. wasm模式
`pnpm run dev`


