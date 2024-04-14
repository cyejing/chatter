interface ChatterBoardAttr {
  title: String;
  onChange: () => void;
}
export default function ChatterBoard({ title, onChange }: ChatterBoardAttr) {
  return (
    <>
      <div>
        <button onClick={onChange}>返回 {title}</button>
      </div>
    </>
  );
}
