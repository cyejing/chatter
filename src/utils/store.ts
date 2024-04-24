import { useState } from "react";
import { createStore } from "hox";
import { TextResp, translate_q } from "./rust_agent";
import { KeyCode } from "../components/ChatterBoard";

export interface TextContent {
  origin?: string;
  lines?: Array<string>;
  lineWords?: Array<Array<string>>;
  lineIndex: number;
  lineCharIndex: number;
  lineWordIndex: number;
}

export const [useConextStore, ContextProvider] = createStore(() => {
  const [tc, _setTextContent] = useState<TextContent>({
    lineIndex: 0,
    lineCharIndex: 0,
    lineWordIndex: 0,
  });

  function setTextResp(tr: TextResp) {
    _setTextContent({
      ...tr,
      lineWords: tr.line_words,
      lineIndex: 0,
      lineCharIndex: 0,
      lineWordIndex: 0,
    });
  }

  function currentLine() {
    return tc.lines && tc.lines[tc.lineIndex];
  }
  function currentLineSlice() {
    const line = currentLine();
    const inputText = line?.slice(0, tc.lineCharIndex);
    const waitInputText = line?.slice(tc.lineCharIndex);
    return [inputText, waitInputText];
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
      const nextLineIndex = tc.lineIndex + 1;
      if (tc.lines && nextLineIndex > tc.lines.length) {
        // end
        return;
      } else {
        // nextLine
        tc.lineIndex = nextLineIndex;
        tc.lineCharIndex = 0;
        tc.lineWordIndex = 0;
      }
    } else {
      //nextChar
      tc.lineCharIndex = nextLineCharIndex;
    }
  }

  function addWord() {
    tc.lineWordIndex += 1;
  }

  function currentWord() {
    return tc.lineWords && tc.lineWords[tc.lineIndex][tc.lineWordIndex];
  }

  function handleKeyCode(kc: KeyCode) {
    if (kc.key == nextChar()) {
      if (kc.key === " ") {
        addWord();
      }

      addChar();

      if (nextChar() === " " || isLineEnd()) {
        const word = currentWord();
        if (word) {
          translate_q(word).then((resp) => {
            console.log("translate resp:", resp);
          });
        }
      }
    }
  }

  return {
    tc,
    setTextResp,
    handleKeyCode,
    currentLineSlice,
  };
});
