interface TextBoardProp {}

export default function TextBoard({}: TextBoardProp) {
  return (
    <>
      <div className="relative w-full h-full text-lg overflow-hidden">
        <div className="absolute">
          <ul>
            <li>text line1</li>
            <li>text line2</li>
            <li>text line3</li>
            <li>text line4</li>
            <li>text line5</li>
            <li>text line6</li>
            <li>text line7</li>
            <li>text line</li>
            <li>text line</li>
            <li>text line</li>
            <li>text line</li>
            <li>text line</li>
            <li>text line</li>
          </ul>
        </div>
      </div>
    </>
  );
}
