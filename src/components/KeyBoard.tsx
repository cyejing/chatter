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
      return dclass + " " + "border-0 bg-success";
    } else {
      return dclass;
    }
  }

  return (
    <>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("Escape", "kbd w-10")}>⎋</kbd>
        <kbd className={kbdClass("Digit1", "kbd w-9")}>1</kbd>
        <kbd className={kbdClass("Digit2", "kbd w-9")}>2</kbd>
        <kbd className={kbdClass("Digit3", "kbd w-9")}>3</kbd>
        <kbd className={kbdClass("Digit4", "kbd w-9")}>4</kbd>
        <kbd className={kbdClass("Digit5", "kbd w-9")}>5</kbd>
        <kbd className={kbdClass("Digit6", "kbd w-9")}>6</kbd>
        <kbd className={kbdClass("Digit7", "kbd w-9")}>7</kbd>
        <kbd className={kbdClass("Digit8", "kbd w-9")}>8</kbd>
        <kbd className={kbdClass("Digit9", "kbd w-9")}>9</kbd>
        <kbd className={kbdClass("Digit0", "kbd w-9")}>0</kbd>
        <kbd className={kbdClass("Minus", "kbd w-9")}>-</kbd>
        <kbd className={kbdClass("Equal", "kbd w-9")}>=</kbd>
        <kbd className={kbdClass("Backspace", "kbd w-20")}>⌫</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("Tab", "kbd w-14")}>⇥</kbd>
        <kbd className={kbdClass("KeyQ", "kbd w-9")}>q</kbd>
        <kbd className={kbdClass("KeyW", "kbd w-9")}>w</kbd>
        <kbd className={kbdClass("KeyE", "kbd w-9")}>e</kbd>
        <kbd className={kbdClass("KeyR", "kbd w-9")}>r</kbd>
        <kbd className={kbdClass("KeyT", "kbd w-9")}>t</kbd>
        <kbd className={kbdClass("KeyY", "kbd w-9")}>y</kbd>
        <kbd className={kbdClass("KeyU", "kbd w-9")}>u</kbd>
        <kbd className={kbdClass("KeyI", "kbd w-9")}>i</kbd>
        <kbd className={kbdClass("KeyO", "kbd w-9")}>o</kbd>
        <kbd className={kbdClass("KeyP", "kbd w-9")}>p</kbd>
        <kbd className={kbdClass("BracketLeft", "kbd w-9")}>[</kbd>
        <kbd className={kbdClass("BracketRight", "kbd w-9")}>]</kbd>
        <kbd className={kbdClass("Backslash", "kbd w-10")}>\</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("CapsLock", "kbd w-16")}>⇪</kbd>
        <kbd className={kbdClass("KeyA", "kbd w-9")}>a</kbd>
        <kbd className={kbdClass("KeyS", "kbd w-9")}>s</kbd>
        <kbd className={kbdClass("KeyD", "kbd w-9")}>d</kbd>
        <kbd className={kbdClass("KeyF", "kbd w-9")}>f</kbd>
        <kbd className={kbdClass("KeyG", "kbd w-9")}>g</kbd>
        <kbd className={kbdClass("KeyH", "kbd w-9")}>h</kbd>
        <kbd className={kbdClass("KeyJ", "kbd w-9")}>j</kbd>
        <kbd className={kbdClass("KeyK", "kbd w-9")}>k</kbd>
        <kbd className={kbdClass("KeyL", "kbd w-9")}>l</kbd>
        <kbd className={kbdClass("Semicolon", "kbd w-9")}>;</kbd>
        <kbd className={kbdClass("Quote", "kbd w-9")}>'</kbd>
        <kbd className={kbdClass("Enter", "kbd w-20")}>⏎</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("ShiftLeft", "kbd w-20")}>⇧</kbd>
        <kbd className={kbdClass("KeyZ", "kbd w-9")}>z</kbd>
        <kbd className={kbdClass("KeyX", "kbd w-9")}>x</kbd>
        <kbd className={kbdClass("KeyC", "kbd w-9")}>c</kbd>
        <kbd className={kbdClass("KeyV", "kbd w-9")}>v</kbd>
        <kbd className={kbdClass("KeyB", "kbd w-9")}>b</kbd>
        <kbd className={kbdClass("KeyN", "kbd w-9")}>n</kbd>
        <kbd className={kbdClass("KeyM", "kbd w-9")}>m</kbd>
        <kbd className={kbdClass("Comma", "kbd w-9")}>,</kbd>
        <kbd className={kbdClass("Period", "kbd w-9")}>.</kbd>
        <kbd className={kbdClass("Slash", "kbd w-9")}>/</kbd>
        <kbd className={kbdClass("ShiftRight", "kbd w-9")}>⇧</kbd>
        <kbd className={kbdClass("ArrowUp", "kbd w-9")}>▲</kbd>
        <kbd className={kbdClass("Delete", "kbd w-9")}>⌦</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("ControlLeft", "kbd w-12")}>⌃</kbd>
        <kbd className={kbdClass("AltLeft", "kbd w-12")}>⌥</kbd>
        <kbd className={kbdClass("MetaLeft", "kbd w-12")}>⌘</kbd>
        <kbd className={kbdClass("Space", "kbd w-60")}>␣</kbd>
        <kbd className={kbdClass("MetaRight", "kbd w-9")}>⌘</kbd>
        <kbd className={kbdClass("ControlRight", "kbd w-9")}>⌃</kbd>
        <kbd className={kbdClass("ArrowLeft", "kbd w-9")}>◀︎</kbd>
        <kbd className={kbdClass("ArrowDown", "kbd w-9")}>▼</kbd>
        <kbd className={kbdClass("ArrowRight", "kbd w-9")}>▶︎</kbd>
      </div>
    </>
  );
}
