interface TextLineProp {
  children: string;
  highlight_index?: number;
}
export default function TextLine({ children, highlight_index }: TextLineProp) {
  let highlight_text = "";
  let text = children;
  if (highlight_index && highlight_index > 0) {
    highlight_text = text.slice(0, highlight_index);
    text = text.slice(highlight_index);
  }
  return (
    <p className="text-center">
      {highlight_text != "" && (
        <span className="bg-red-400">{highlight_text}</span>
      )}
      {text}
    </p>
  );
}
