import { KeyCode } from "./ChatterBoard";

export default function KeyBoard({
  keyCodes: keyCode,
}: {
  keyCodes?: KeyCode[];
}) {
  function kbdClass(key: string, dclass: string, code?: string) {
    if (keyCode === undefined) {
      return;
    }

    let currentKeyState = keyCode.find((k) => k.key == key);
    if (code) {
      currentKeyState = keyCode.find((k) => k.key == key && k.code == code);
    }

    if (
      currentKeyState &&
      currentKeyState.type === "keydown" &&
      currentKeyState.key == key
    ) {
      if (code) {
        if (currentKeyState.code == code) {
          return dclass + " " + "border-0 bg-success";
        } else {
          return dclass;
        }
      } else {
        return dclass + " " + "border-0 bg-success";
      }
    } else {
      return dclass;
    }
  }

  return (
    <>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("Escape", "kbd w-10")}>⎋</kbd>
        <kbd className={kbdClass("1", "kbd w-9")}>1</kbd>
        <kbd className={kbdClass("2", "kbd w-9")}>2</kbd>
        <kbd className={kbdClass("3", "kbd w-9")}>3</kbd>
        <kbd className={kbdClass("4", "kbd w-9")}>4</kbd>
        <kbd className={kbdClass("5", "kbd w-9")}>5</kbd>
        <kbd className={kbdClass("6", "kbd w-9")}>6</kbd>
        <kbd className={kbdClass("7", "kbd w-9")}>7</kbd>
        <kbd className={kbdClass("8", "kbd w-9")}>8</kbd>
        <kbd className={kbdClass("9", "kbd w-9")}>9</kbd>
        <kbd className={kbdClass("0", "kbd w-9")}>0</kbd>
        <kbd className={kbdClass("-", "kbd w-9")}>-</kbd>
        <kbd className={kbdClass("=", "kbd w-9")}>=</kbd>
        <kbd className={kbdClass("Backspace", "kbd w-20")}>⌫</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("Tab", "kbd w-14")}>⇥</kbd>
        <kbd className={kbdClass("q", "kbd w-9")}>q</kbd>
        <kbd className={kbdClass("w", "kbd w-9")}>w</kbd>
        <kbd className={kbdClass("e", "kbd w-9")}>e</kbd>
        <kbd className={kbdClass("r", "kbd w-9")}>r</kbd>
        <kbd className={kbdClass("t", "kbd w-9")}>t</kbd>
        <kbd className={kbdClass("y", "kbd w-9")}>y</kbd>
        <kbd className={kbdClass("u", "kbd w-9")}>u</kbd>
        <kbd className={kbdClass("i", "kbd w-9")}>i</kbd>
        <kbd className={kbdClass("o", "kbd w-9")}>o</kbd>
        <kbd className={kbdClass("p", "kbd w-9")}>p</kbd>
        <kbd className={kbdClass("[", "kbd w-9")}>[</kbd>
        <kbd className={kbdClass("]", "kbd w-9")}>]</kbd>
        <kbd className={kbdClass("\\", "kbd w-10")}>\</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("Control", "kbd w-16", "ControlRight")}>⇪</kbd>
        <kbd className={kbdClass("a", "kbd w-9")}>a</kbd>
        <kbd className={kbdClass("s", "kbd w-9")}>s</kbd>
        <kbd className={kbdClass("d", "kbd w-9")}>d</kbd>
        <kbd className={kbdClass("f", "kbd w-9")}>f</kbd>
        <kbd className={kbdClass("g", "kbd w-9")}>g</kbd>
        <kbd className={kbdClass("h", "kbd w-9")}>h</kbd>
        <kbd className={kbdClass("j", "kbd w-9")}>j</kbd>
        <kbd className={kbdClass("k", "kbd w-9")}>k</kbd>
        <kbd className={kbdClass("l", "kbd w-9")}>l</kbd>
        <kbd className={kbdClass(";", "kbd w-9")}>;</kbd>
        <kbd className={kbdClass("'", "kbd w-9")}>'</kbd>
        <kbd className={kbdClass("Enter", "kbd w-20")}>⏎</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("Shift", "kbd w-20", "ShiftLeft")}>⇧</kbd>
        <kbd className={kbdClass("z", "kbd w-9")}>z</kbd>
        <kbd className={kbdClass("x", "kbd w-9")}>x</kbd>
        <kbd className={kbdClass("c", "kbd w-9")}>c</kbd>
        <kbd className={kbdClass("v", "kbd w-9")}>v</kbd>
        <kbd className={kbdClass("b", "kbd w-9")}>b</kbd>
        <kbd className={kbdClass("n", "kbd w-9")}>n</kbd>
        <kbd className={kbdClass("m", "kbd w-9")}>m</kbd>
        <kbd className={kbdClass(",", "kbd w-9")}>,</kbd>
        <kbd className={kbdClass(".", "kbd w-9")}>.</kbd>
        <kbd className={kbdClass("/", "kbd w-9")}>/</kbd>
        <kbd className={kbdClass("Shift", "kbd w-9", "ShiftRight")}>⇧</kbd>
        <kbd className={kbdClass("ArrowUp", "kbd w-9")}>▲</kbd>
        <kbd className={kbdClass("Delete", "kbd w-9")}>⌦</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className={kbdClass("Control", "kbd w-12", "ControlLeft")}>⌃</kbd>
        <kbd className={kbdClass("Alt", "kbd w-12")}>⌥</kbd>
        <kbd className={kbdClass("Meta", "kbd w-12", "MetaLeft")}>⌘</kbd>
        <kbd className={kbdClass(" ", "kbd w-60")}>␣</kbd>
        <kbd className={kbdClass("Meta", "kbd w-9", "MetaRight")}>⌘</kbd>
        <kbd className={kbdClass("fn", "kbd w-9")}>fn</kbd>
        <kbd className={kbdClass("ArrowLeft", "kbd w-9")}>◀︎</kbd>
        <kbd className={kbdClass("ArrowDown", "kbd w-9")}>▼</kbd>
        <kbd className={kbdClass("ArrowRight", "kbd w-9")}>▶︎</kbd>
      </div>
    </>
  );
}
