import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ContextProvider } from "./utils/store.ts";

console.log(
  "run in mode: ",
  import.meta.env.MODE,
  "dev: ",
  import.meta.env.DEV,
  "prod: ",
  import.meta.env.PROD,
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
);
