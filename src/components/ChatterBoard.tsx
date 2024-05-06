import KeyBoard from "./KeyBoard";
import TextBoard from "./TextBoard";
import { useConextStore } from "../utils/store";
import { KeyCode, useKeyListener } from "../utils/key_listener";

export default function ChatterBoard({ onBack }: { onBack: () => void }) {
  const keyCodes = useKeyListener(dispatch, ["Tab"]);

  const { handleKeyCode } = useConextStore();
  function dispatch(kc: KeyCode) {
    handleKeyCode(kc);
    if (kc.code === "KeyB" && kc.ctrlKey) {
      onBack();
    }
  }

  return (
    <>
      <main className="container mx-auto h-screen flex flex-col">
        <div className="w-2/3 mx-auto pt-2">
          <button className="btn btn-sm btn-block" onClick={onBack}>
            返回
          </button>
        </div>
        <div className="py-4 grow p-2">
          <TextBoard keyCodes={keyCodes}></TextBoard>
        </div>
        <div className="py-2 invisible">
          <KeyBoard></KeyBoard>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-screen bg-base-200">
        <div className="container max-w-xl mx-auto py-2">
          <KeyBoard keyCodes={keyCodes} />
        </div>
      </div>
    </>
  );
}
