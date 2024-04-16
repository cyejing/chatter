import { invoke } from "@tauri-apps/api";

interface TranslateReq {
  provider: string;
  q?: string;
  from: string;
  to: string;
}

const translateReqDefault: TranslateReq = {
  provider: "google",
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
  return invoke<TranslateResp>("translate", {
    req: {
      ...translateReqDefault,
      q: q,
    },
  });
}

export async function translate(req: TranslateReq) {
  return invoke<TranslateResp>("translate", {
    req: req,
  });
}

export function recognize(text: string) {
  return invoke<TranslateResp>("recognize", {
    req: {
      text: text,
      mode: "no_pun",
    },
  });
}
