import { useState } from "react";

import { createStore } from "hox";
import { type TextResp, translate_q } from "./rust_agent";
import { type KeyCode } from "./key_listener";

export interface TextContent {
  origin?: string;
  lines?: Array<string>;
  lineWords?: Array<Array<string>>;
  lineIndex: number;
  lineCharIndex: number;
  lineWordIndex: number;
  preLineIndex: number;
  preLineWordIndex: number;
}

export function keyToView(key?: string) {
  switch (key) {
    case " ":
      return "␣";
    case "Enter":
      return "⏎";
    default:
      return key;
  }
}

export const [useConextStore, ContextProvider] = createStore(() => {
  const [tc, _setTextContent] = useState<TextContent>({
    lineIndex: 0,
    lineCharIndex: 0,
    lineWordIndex: 0,
    preLineIndex: 0,
    preLineWordIndex: 0,
  });

  function setTextResp(tr: TextResp) {
    const tc = {
      ...tr,
      lineWords: tr.line_words,
      lineIndex: 0,
      lineCharIndex: 0,
      lineWordIndex: 0,
      preLineIndex: 0,
      preLineWordIndex: 0,
    };
    _setTextContent(tc);

    for (let i = 0; i < 5; i++) {
      preTranslate(tc);
    }
  }

  function currentLine() {
    return tc.lines && tc.lines[tc.lineIndex];
  }

  function currentLineSlice() {
    const line = currentLine();
    const cnextChar = keyToView(nextChar());
    const prevText = line?.slice(0, tc.lineCharIndex);
    const nextText = line?.slice(tc.lineCharIndex + 1);
    return [prevText, cnextChar, nextText];
  }

  function isLineEnd(): boolean {
    const line = currentLine();
    return line != undefined && tc.lineCharIndex == line.length;
  }

  function nextChar() {
    const line = currentLine();
    if (tc.lineCharIndex == line?.length) {
      return "Enter";
    } else {
      return line?.charAt(tc.lineCharIndex);
    }
  }

  function addChar() {
    const line = currentLine();

    const nextLineCharIndex = tc.lineCharIndex + 1;
    if (line && nextLineCharIndex > line.length) {
      // nextLine
      const nextLineIndex = tc.lineIndex + 1;
      if (tc.lines && nextLineIndex >= tc.lines.length) {
        // end
        return;
      } else {
        // nextLine
        tc.lineIndex = nextLineIndex;
        tc.lineCharIndex = 0;
        tc.lineWordIndex = 0;
      }
    } else {
      if (nextChar() === " ") {
        // addWord
        tc.lineWordIndex += 1;
      }
      //nextChar
      tc.lineCharIndex = nextLineCharIndex;
    }
  }

  function currentWord() {
    return tc.lineWords && tc.lineWords[tc.lineIndex][tc.lineWordIndex];
  }

  function handleKeyCode(kc: KeyCode) {
    if (kc.key == nextChar() || kc.code === "Escape") {
      addChar();

      if (nextChar() === " ") {
        const word = currentWord();
        if (word) {
          translate_q(word).then((resp) => {
            console.info("handle translateWord:", resp);
          });
          preTranslate(tc);
        }
      }
      if (isLineEnd()) {
        console.log("handle translateLine");
      }
    }
  }

  function preTranslate(tc: TextContent) {
    if (tc.lineWords) {
      if (tc.preLineIndex === 0 && tc.preLineWordIndex === 0) {
        const q = tc.lineWords[tc.preLineIndex][tc.preLineWordIndex];
        translate_q(q);
      }

      const currentPreLine = tc.lineWords[tc.preLineIndex];

      const nextPreLineWordIndex = tc.preLineWordIndex + 1;
      if (currentPreLine && nextPreLineWordIndex >= currentPreLine.length) {
        const nextLineIndex = tc.preLineIndex + 1;
        if (tc.lines && nextLineIndex >= tc.lines.length) {
          // end
          return;
        } else {
          // nextLine
          tc.preLineIndex = nextLineIndex;
          tc.preLineWordIndex = 0;
        }
      } else {
        // nextWord
        tc.preLineWordIndex = nextPreLineWordIndex;
      }

      const q = tc.lineWords[tc.preLineIndex][tc.preLineWordIndex];
      translate_q(q);
    }
  }

  return {
    tc,
    setTextResp,
    handleKeyCode,
    currentLineSlice,
  };
});
