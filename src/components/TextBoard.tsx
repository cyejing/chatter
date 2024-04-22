import { useConextStore } from "../utils/store";
import TextLine from "./TextLine";

export default function TextBoard() {
  const { tc } = useConextStore();
  return (
    <>
      <div className="relative w-full h-full text-lg overflow-hidden border rounded-lg border-neutral-content p-2">
        <div className="absolute w-full block">
          {tc.lines?.map((i) => <TextLine key={i}>{i}</TextLine>)}
        </div>
      </div>
    </>
  );
}
