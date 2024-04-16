import { KeyCode } from "./ChatterBoard";

interface KeyBoardProp {
  keyState?: Array<KeyCode>;
}

export default function KeyBoard({ keyState }: KeyBoardProp) {
  function kbdClass(key: string, dclass: string) {
    if (keyState === undefined) {
      return;
    }

    const currentKeyState = keyState.find((k) => k.key == key);

    if (currentKeyState?.type === "keydown" && currentKeyState?.key == key) {
      return dclass + " " + "border-0 bg-success";
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
        <kbd className="kbd w-9">5</kbd>
        <kbd className="kbd w-9">6</kbd>
        <kbd className="kbd w-9">7</kbd>
        <kbd className="kbd w-9">8</kbd>
        <kbd className="kbd w-9">9</kbd>
        <kbd className="kbd w-9">0</kbd>
        <kbd className="kbd w-9">-</kbd>
        <kbd className="kbd w-9">=</kbd>
        <kbd className="kbd w-20">⌫</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className="kbd w-14">⇥</kbd>
        <kbd className="kbd w-9">q</kbd>
        <kbd className="kbd w-9">w</kbd>
        <kbd className="kbd w-9">e</kbd>
        <kbd className="kbd w-9">r</kbd>
        <kbd className="kbd w-9">t</kbd>
        <kbd className="kbd w-9">y</kbd>
        <kbd className="kbd w-9">u</kbd>
        <kbd className="kbd w-9">i</kbd>
        <kbd className="kbd w-9">o</kbd>
        <kbd className="kbd w-9">p</kbd>
        <kbd className="kbd w-9">[</kbd>
        <kbd className="kbd w-9">]</kbd>
        <kbd className="kbd w-10">\</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className="kbd w-16">⇪</kbd>
        <kbd className="kbd w-9 {keyState.key === a}">a</kbd>
        <kbd className="kbd w-9">s</kbd>
        <kbd className="kbd w-9">d</kbd>
        <kbd className="kbd w-9">f</kbd>
        <kbd className="kbd w-9">g</kbd>
        <kbd className="kbd w-9">h</kbd>
        <kbd className="kbd w-9">j</kbd>
        <kbd className="kbd w-9">k</kbd>
        <kbd className="kbd w-9">l</kbd>
        <kbd className="kbd w-9">;</kbd>
        <kbd className="kbd w-9">'</kbd>
        <kbd className="kbd w-20">⏎</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className="kbd w-20">⇧</kbd>
        <kbd className="kbd w-9">z</kbd>
        <kbd className="kbd w-9">x</kbd>
        <kbd className="kbd w-9">c</kbd>
        <kbd className="kbd w-9">v</kbd>
        <kbd className="kbd w-9">b</kbd>
        <kbd className="kbd w-9">n</kbd>
        <kbd className="kbd w-9">m</kbd>
        <kbd className="kbd w-9">,</kbd>
        <kbd className="kbd w-9">.</kbd>
        <kbd className="kbd w-9">/</kbd>
        <kbd className="kbd w-9">⇧</kbd>
        <kbd className="kbd w-9">▲</kbd>
        <kbd className="kbd w-9">⌦</kbd>
      </div>
      <div className="flex justify-center gap-1 my-1 w-ful">
        <kbd className=" kbd w-12">⌃</kbd>
        <kbd className="kbd w-12">⌥</kbd>
        <kbd className="kbd w-12">⌘</kbd>
        <kbd className="kbd w-60">␣</kbd>
        <kbd className="kbd w-9">⌘</kbd>
        <kbd className="kbd w-9">fn</kbd>
        <kbd className="kbd w-9">◀︎</kbd>
        <kbd className="kbd w-9">▼</kbd>
        <kbd className="kbd w-9">▶︎</kbd>
      </div>
    </>
  );
}
