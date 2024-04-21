import { useState } from "react";
import { createStore } from "hox";
import { TextResp } from "./rust_agent";

export interface TextContent {
  origin?: string;
  lines?: Array<string>;
  line_words?: Array<Array<string>>;
  lineIndex: number;
  lineWordIndex: number;
}

export const [useConextStore, ContextProvider] = createStore(() => {
  const [tc, _setTextContent] = useState<TextContent>({
    lineIndex: 0,
    lineWordIndex: 0,
  });

  function setTextResp(tr: TextResp) {
    _setTextContent({
      ...tr,
      lineIndex: 0,
      lineWordIndex: 0,
    });
  }

  function currentLine() {
    return tc.lines && tc.lines[tc.lineIndex];
  }

  return {
    tc,
    setTextResp,
    currentLine,
  };
});
