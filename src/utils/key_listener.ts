import { useEffect, useState } from "react";
import { keyToView } from "./store";

export interface KeyCode {
  key: string;
  keyView?: string;
  code: string;
  type: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  preventDefault: () => void;
  stopPropagation: () => void;
}

export function useKeyListener(
  onChange: (kc: KeyCode) => void,
): Array<KeyCode> {
  const [keyCodes, setKeyCode] = useState<Array<KeyCode>>([]);

  useEffect(() => {
    function handleKeyboardEvent(e: KeyboardEvent): void {
      const kc: KeyCode = {
        key: e.key,
        keyView: keyToView(e.key),
        code: e.code,
        type: e.type,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        altKey: e.altKey,
        preventDefault: e.preventDefault,
        stopPropagation: e.stopPropagation,
      };

      if (e.type === "keydown") {
        setKeyCode((ks) => [...ks, kc]);
        onChange(kc);
      } else if (e.type === "keyup") {
        setKeyCode((ks) => ks.filter((k) => k.code !== e.code));
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

  return keyCodes;
}
