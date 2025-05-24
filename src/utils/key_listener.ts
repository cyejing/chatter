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
}

export function useKeyListener(
  onChange: (kc: KeyCode) => void,
  preventCodes?: string[],
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
      };

      if (e.type === "keydown") {
        setKeyCode((ks) => [...ks, kc]);

        if (preventCodes?.includes(e.code)) {
          e.preventDefault();
        }

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
    // eslint-disable-next-line
  }, []);

  return keyCodes;
}
