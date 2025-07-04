import KeyBoard from "./KeyBoard";
import TextBoard from "./TextBoard";
import { useConextStore } from "../utils/store";
import { type KeyCode, useKeyListener } from "../utils/key_listener";

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
      <main className="container mx-auto flex h-screen flex-col">
        <div className="mx-auto w-2/3 pt-2">
          <button className="btn btn-sm btn-block" onClick={onBack}>
            返回
            <kbd className="kbd kbd-sm">⌃</kbd>
            <kbd className="kbd kbd-sm">B</kbd>
          </button>
        </div>
        <div className="grow p-2 py-4">
          <TextBoard keyCodes={keyCodes}></TextBoard>
        </div>
        <div className="invisible py-2">
          <KeyBoard></KeyBoard>
        </div>
      </main>

      <div className="bg-base-200 fixed bottom-0 left-0 w-screen">
        <KeyBoard keyCodes={keyCodes} />
      </div>
    </>
  );
}
