import { useEffect, useState } from "react";
import KeyBoard from "./KeyBoard";
import TextBoard from "./TextBoard";
import { translate_q } from "../utils/rust_agent";

export interface KeyCode {
  key: string;
  code: string;
  type: string;
}

function useKeyListener(onChange: (e: KeyCode) => void): Array<KeyCode> {
  const [keyCode, setKeyCode] = useState<Array<KeyCode>>([]);

  useEffect(() => {
    function handleKeyboardEvent(e: KeyboardEvent): void {
      const kc: KeyCode = {
        key: e.key,
        code: e.code,
        type: e.type,
      };

      if (e.type === "keydown") {
        setKeyCode((ks) => [...ks, kc]);
        onChange(kc);
      } else if (e.type === "keyup") {
        setKeyCode((ks) => ks.filter((k) => k.key !== e.key));
      }
    }
    document.addEventListener("keydown", handleKeyboardEvent);
    document.addEventListener("keyup", handleKeyboardEvent);
    console.log(`the component is now mounted.`);

    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent);
      document.removeEventListener("keyup", handleKeyboardEvent);
      console.log("the component is now unmounted");
    };
  }, []);

  return keyCode;
}

function dispatch(e: KeyCode) {
  if (e?.key === "2") {
    translate_q("current me use up up").then((resp) =>
      console.log("translate resp:", resp),
    );
  }
}

export default function ChatterBoard({ onBack }: { onBack: () => void }) {
  const keyCodes = useKeyListener(dispatch);

  return (
    <>
      <main className="container mx-auto h-screen flex flex-col">
        <div className="w-2/3 mx-auto pt-2">
          <button className="btn btn-sm btn-block" onClick={onBack}>
            返回
          </button>
        </div>
        <div className="py-4 grow p-2">
          <TextBoard />
        </div>
        <div className="py-2 invisible">
          <KeyBoard></KeyBoard>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-screen bg-base-200">
        <div className="container max-w-xl mx-auto py-2">
          <KeyBoard keyCode={keyCodes} />
        </div>
      </div>
    </>
  );
}
