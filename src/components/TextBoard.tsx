import { useConextStore } from "../utils/store";
import TextLine from "./TextLine";

export default function TextBoard() {
  const { tc, currentLineSlice } = useConextStore();
  const [inputText, waitInputText] = currentLineSlice();
  return (
    <>
      <div className="relative w-full h-full text-lg overflow-hidden">
        <div className="absolute w-full block px-2">
          {tc.lines?.map((line, index) => {
            if (index == tc.lineIndex && waitInputText != undefined) {
              return (
                <TextLine key={line} inputText={inputText}>
                  {waitInputText}
                </TextLine>
              );
            } else {
              return <TextLine key={line}>{line}</TextLine>;
            }
          })}
        </div>
      </div>
    </>
  );
}
