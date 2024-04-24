interface TextLineProp {
  children: string;
  inputText?: string;
}
export default function TextLine({ children, inputText }: TextLineProp) {
  const text = children;
  const currentLine = inputText != undefined;

  return (
    <p
      className={
        currentLine
          ? "text-center border bg-neutral rounded-md text-neutral-content p-2 text-2xl"
          : "text-center"
      }
    >
      {currentLine && <span className="text-success">{inputText}</span>}
      {text}
    </p>
  );
}
