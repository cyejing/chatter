import { useRef, useState } from "react";
import { recognize } from "../utils/rust_agent";
import { useConextStore } from "../utils/store";
import { type KeyCode, useKeyListener } from "../utils/key_listener";

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
      <main className="container mx-auto flex h-screen flex-col">
        <div className="grow p-6">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="textarea textarea-bordered h-full w-full resize-none text-lg"
            placeholder="输入待翻译的文本 ⌃+I"
          ></textarea>
        </div>
        <div className="invisible p-6">
          <button className="btn">sitg</button>
        </div>
      </main>

      <div className="bg-base-200 absolute bottom-0 left-0 w-screen">
        <div className="container mx-auto flex justify-end p-6">
          <button
            ref={submitButtonRef}
            className="btn btn-primary btn-md btn-block"
            onClick={handleSubmit}
          >
            提交
            <kbd className="kbd kbd-sm">⌃</kbd>
            <kbd className="kbd kbd-sm">J</kbd>
          </button>
        </div>
      </div>
    </>
  );
}
