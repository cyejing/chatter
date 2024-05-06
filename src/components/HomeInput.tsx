import { useRef, useState } from "react";
import { recognize } from "../utils/rust_agent";
import { useConextStore } from "../utils/store";
import { KeyCode, useKeyListener } from "../utils/key_listener";

export default function TextInput({ onSubmit }: { onSubmit: () => void }) {
  const [text, setText] = useState(
    "hello world. Night gathers, and now my watch begins.It shall not end until my death.I shall take no wife, hold no lands, father no children.I shall wear no crowns and win no glory.I shall live and die at my post.",
  );
  const { setTextResp } = useConextStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  async function handleSubmit() {
    const tr = await recognize(text);
    setTextResp(tr);
    onSubmit();
  }

  const _keyCodes = useKeyListener(dispatch);
  function dispatch(kc: KeyCode) {
    if (kc.code === "KeyJ" && kc.ctrlKey) {
      textareaRef.current?.blur();
      submitButtonRef.current?.click();
    }
    if (kc.code === "KeyI" && kc.ctrlKey) {
      textareaRef.current?.focus();
    }
  }

  return (
    <>
      <main className="container mx-auto h-screen flex flex-col">
        <div className="grow p-6">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="textarea textarea-bordered resize-none w-full h-full text-lg"
            placeholder="输入待翻译的文本"
          ></textarea>
        </div>
        <div className="invisible p-6">
          <button className="btn">sitg</button>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 w-screen bg-base-200">
        <div className="container mx-auto p-6 flex justify-end">
          <button
            ref={submitButtonRef}
            className="btn btn-primary btn-md btn-block"
            onClick={handleSubmit}
          >
            提交
          </button>
        </div>
      </div>
    </>
  );
}
