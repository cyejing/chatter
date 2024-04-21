import { invoke } from "@tauri-apps/api";
import axios from "axios";

interface TranslateReq {
  provider: string;
  q?: string;
  from: string;
  to: string;
}

const translateReqDefault: TranslateReq = {
  provider: "microsoft",
  q: undefined,
  from: "auto",
  to: "zh-cn",
};

interface TranslateResp {
  provider: string;
  q: string;
  from: string;
  to: string;
  trans: string;
  trans_detail: Array<string>;
  trans_detail2: Array<string>;
}

export async function translate_q(q: string) {
  const mode = import.meta.env.VITE_RUST_BRIDGE;
  if (mode === "server") {
    const { data } = await axios.post<TranslateResp>("/api/translate", {
      ...translateReqDefault,
      q: q,
    });
    return data;
  } else {
    return invoke<TranslateResp>("translate", {
      req: {
        ...translateReqDefault,
        q: q,
      },
    });
  }
}

export async function translate(req: TranslateReq) {
  const mode = import.meta.env.VITE_RUST_BRIDGE;
  if (mode === "server") {
    const { data } = await axios.post<TranslateResp>("/api/translate", req);
    return data;
  } else {
    return invoke<TranslateResp>("translate", {
      req: req,
    });
  }
}

export interface TextResp {
  origin?: string;
  lines?: Array<string>;
  line_words?: Array<Array<string>>;
}

export async function recognize(text: string) {
  const mode = import.meta.env.VITE_RUST_BRIDGE;
  if (mode === "server") {
    const { data } = await axios.post("/api/recognize", {
      text: text,
      mode: "no_pun",
    });
    return data;
  } else {
    return invoke<TextResp>("recognize", {
      req: {
        text: text,
        mode: "no_pun",
      },
    });
  }
}