import { KeyCode } from "../utils/key_listener";

export default function KeyBoard({ keyCodes }: { keyCodes?: KeyCode[] }) {
  function kbdClass(code: string, dclass: string) {
    if (keyCodes === undefined) {
      return;
    }

    const currentKeyState = keyCodes.find((k) => k.code == code);

    if (
      currentKeyState &&
      currentKeyState.type === "keydown" &&
      currentKeyState.code == code
    ) {
      return dclass + " kbd kbd-sm sm:kbd-md flex-auto border-0 bg-success";
    } else {
      return dclass + " kbd kbd-sm sm:kbd-md flex-auto";
    }
  }

  return (
    <div className="container max-w-md sm:max-w-xl mx-auto py-2">
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("Escape", "w-10")}>⎋</kbd>
        <kbd className={kbdClass("Digit1", "w-9")}>1</kbd>
        <kbd className={kbdClass("Digit2", "w-9")}>2</kbd>
        <kbd className={kbdClass("Digit3", "w-9")}>3</kbd>
        <kbd className={kbdClass("Digit4", "w-9")}>4</kbd>
        <kbd className={kbdClass("Digit5", "w-9")}>5</kbd>
        <kbd className={kbdClass("Digit6", "w-9")}>6</kbd>
        <kbd className={kbdClass("Digit7", "w-9")}>7</kbd>
        <kbd className={kbdClass("Digit8", "w-9")}>8</kbd>
        <kbd className={kbdClass("Digit9", "w-9")}>9</kbd>
        <kbd className={kbdClass("Digit0", "w-9")}>0</kbd>
        <kbd className={kbdClass("Minus", "w-9")}>-</kbd>
        <kbd className={kbdClass("Equal", "w-9")}>=</kbd>
        <kbd className={kbdClass("Backspace", "w-20")}>⌫</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("Tab", "w-14")}>⇥</kbd>
        <kbd className={kbdClass("KeyQ", "w-9")}>q</kbd>
        <kbd className={kbdClass("KeyW", "w-9")}>w</kbd>
        <kbd className={kbdClass("KeyE", "w-9")}>e</kbd>
        <kbd className={kbdClass("KeyR", "kbd w-9")}>r</kbd>
        <kbd className={kbdClass("KeyT", "w-9")}>t</kbd>
        <kbd className={kbdClass("KeyY", "w-9")}>y</kbd>
        <kbd className={kbdClass("KeyU", "w-9")}>u</kbd>
        <kbd className={kbdClass("KeyI", "w-9")}>i</kbd>
        <kbd className={kbdClass("KeyO", "w-9")}>o</kbd>
        <kbd className={kbdClass("KeyP", "w-9")}>p</kbd>
        <kbd className={kbdClass("BracketLeft", "w-9")}>[</kbd>
        <kbd className={kbdClass("BracketRight", "w-9")}>]</kbd>
        <kbd className={kbdClass("Backslash", "w-10")}>\</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("CapsLock", "w-16")}>⇪</kbd>
        <kbd className={kbdClass("KeyA", "w-9")}>a</kbd>
        <kbd className={kbdClass("KeyS", "w-9")}>s</kbd>
        <kbd className={kbdClass("KeyD", "w-9")}>d</kbd>
        <kbd className={kbdClass("KeyF", "w-9")}>f</kbd>
        <kbd className={kbdClass("KeyG", "w-9")}>g</kbd>
        <kbd className={kbdClass("KeyH", "w-9")}>h</kbd>
        <kbd className={kbdClass("KeyJ", "w-9")}>j</kbd>
        <kbd className={kbdClass("KeyK", "w-9")}>k</kbd>
        <kbd className={kbdClass("KeyL", "w-9")}>l</kbd>
        <kbd className={kbdClass("Semicolon", "w-9")}>;</kbd>
        <kbd className={kbdClass("Quote", "w-9")}>'</kbd>
        <kbd className={kbdClass("Enter", "w-20")}>⏎</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("ShiftLeft", "w-20")}>⇧</kbd>
        <kbd className={kbdClass("KeyZ", "w-9")}>z</kbd>
        <kbd className={kbdClass("KeyX", "w-9")}>x</kbd>
        <kbd className={kbdClass("KeyC", "w-9")}>c</kbd>
        <kbd className={kbdClass("KeyV", "w-9")}>v</kbd>
        <kbd className={kbdClass("KeyB", "w-9")}>b</kbd>
        <kbd className={kbdClass("KeyN", "w-9")}>n</kbd>
        <kbd className={kbdClass("KeyM", "w-9")}>m</kbd>
        <kbd className={kbdClass("Comma", "w-9")}>,</kbd>
        <kbd className={kbdClass("Period", "w-9")}>.</kbd>
        <kbd className={kbdClass("Slash", "w-9")}>/</kbd>
        <kbd className={kbdClass("ShiftRight", "w-9")}>⇧</kbd>
        <kbd className={kbdClass("ArrowUp", "w-9")}>▲</kbd>
        <kbd className={kbdClass("Delete", "w-9")}>⌦</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("ControlLeft", "w-12")}>⌃</kbd>
        <kbd className={kbdClass("AltLeft", "w-12")}>⌥</kbd>
        <kbd className={kbdClass("MetaLeft", "w-12")}>⌘</kbd>
        <kbd className={kbdClass("Space", "w-72")}>␣</kbd>
        <kbd className={kbdClass("MetaRight", "w-9")}>⌘</kbd>
        <kbd className={kbdClass("ControlRight", "w-9")}>⌃</kbd>
        <kbd className={kbdClass("ArrowLeft", "w-9")}>◀︎</kbd>
        <kbd className={kbdClass("ArrowDown", "w-9")}>▼</kbd>
        <kbd className={kbdClass("ArrowRight", "w-9")}>▶︎</kbd>
      </div>
    </div>
  );
}
