import { useEffect, useState } from "react";
import KeyBoard from "./KeyBoard";
import TextBoard from "./TextBoard";
import { translate_q } from "../utils/RustAgent";

interface ChatterBoardProp {
  title: string;
  onChange: () => void;
}

export interface KeyCode {
  key: string;
  code: string;
  type: string;
}

export default function ChatterBoard({ onChange }: ChatterBoardProp) {
  const [keyState, setKeyState] = useState<Array<KeyCode>>([]);

  function handleKeyboardEvent(e: KeyboardEvent) {
    const keyCode: KeyCode = {
      key: e.key,
      code: e.code,
      type: e.type,
    };

    if (e.type === "keydown") {
      setKeyState((ks) => [...ks, keyCode]);
      dispatch(keyCode);
    } else if (e.type === "keyup") {
      setKeyState((ks) => ks.filter((k) => k.key !== e.key));
    }
  }

  function dispatch(keyCode: KeyCode) {
    if (keyCode?.key === "2") {
      console.log("invoke translate");
      translate_q("current").then((resp) =>
        console.log("translate resp:", resp),
      );
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardEvent);
    document.addEventListener("keyup", handleKeyboardEvent);
    console.log(`the component is now mounted.`);

    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent);
      document.removeEventListener("keyup", handleKeyboardEvent);
      console.log("the component is now unmounted");
    };
  }, []);

  return (
    <>
      <main className="container mx-auto h-screen flex flex-col">
        <div className="w-2/3 mx-auto py-2">
          <button className="btn btn-sm btn-block" onClick={onChange}>
            返回
          </button>
        </div>

        <div className="py-4 grow">
          <TextBoard />
        </div>
        <div className="py-2 invisible">
          <KeyBoard></KeyBoard>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-screen bg-base-200">
        <div className="container max-w-xl mx-auto py-2">
          <KeyBoard keyState={keyState} />
        </div>
      </div>
    </>
  );
}
