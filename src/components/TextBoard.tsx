import { useConextStore } from "../utils/store";
import { KeyCode } from "./ChatterBoard";
import TextLine from "./TextLine";

export default function TextBoard({ keyCodes }: { keyCodes?: KeyCode[] }) {
  const { tc, currentLineSlice } = useConextStore();
  const [prevText, nextChar, nextText] = currentLineSlice();
  return (
    <>
      <div className="relative w-full h-full text-lg overflow-hidden">
        <div className="absolute w-full block px-2">
          {tc.lines?.map((line, index) => {
            if (index == tc.lineIndex && nextText != undefined) {
              return (
                <TextLine
                  key={line}
                  currentLinePrevText={prevText}
                  currentLineNextChar={nextChar}
                  index={index}
                  currentIndex={tc.lineIndex}
                >
                  {nextText}
                </TextLine>
              );
            } else {
              return (
                <TextLine
                  key={line}
                  index={index}
                  currentIndex={tc.lineIndex}
                  keyCodes={keyCodes}
                >
                  {line}
                </TextLine>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
