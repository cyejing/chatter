import { useConextStore } from "../utils/store";
import { KeyCode } from "./ChatterBoard";
import TextLine from "./TextLine";

export default function TextBoard({ keyCodes }: { keyCodes?: KeyCode[] }) {
  const { tc, currentLineSlice } = useConextStore();
  const [prevText, nextChar, nextText] = currentLineSlice();
  const topEm = -(tc.lineIndex * 1.75) + "rem";
  return (
    <>
      <div className="w-full h-full overflow-hidden">
        <div className="h-2/6"></div>
        <div className="h-4/6 relative">
          <div
            className="absolute w-full block px-2 text-xl"
            style={{
              top: topEm,
            }}
          >
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
      </div>
    </>
  );
}
