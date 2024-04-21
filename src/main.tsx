import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ContextProvider } from "./utils/store.ts";

console.log(import.meta.env.MODE);
console.log(import.meta.env.DEV);
console.log(import.meta.env.PROD);
console.log(import.meta.env.VITE_RUST_BRIDGE);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
);
