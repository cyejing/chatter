import { KeyCode } from "./ChatterBoard";

interface TextLineProp {
  currentLinePrevText?: string;
  currentLineNextChar?: string;
  children: string;
  index: number;
  currentIndex: number;
  keyCodes?: Array<KeyCode>;
}
export default function TextLine({
  children,
  currentLinePrevText,
  currentLineNextChar,
  index,
  currentIndex,
  keyCodes,
}: TextLineProp) {
  const text = children;
  const prevLine = index < currentIndex;
  const currentLine = index == currentIndex;
  let nextChar = currentLineNextChar;
  if (keyCodes && keyCodes.length > 0 && currentLine) {
    nextChar = keyCodes[keyCodes.length - 1].keyView;
  }

  if (prevLine) {
    return <p className="text-center text-success">{text}</p>;
  } else {
    return (
      <p
        className={
          currentLine
            ? "text-center border bg-neutral rounded-md text-neutral-content p-2 text-2xl"
            : "text-center"
        }
      >
        {currentLine && (
          <span className="text-success">{currentLinePrevText}</span>
        )}
        <span className="text-secondary">{nextChar}</span>
        {text}
      </p>
    );
  }
}
