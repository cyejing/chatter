interface TextInputProp {
  title: string;
  onChange: () => void;
}

export default function TextInput({ title, onChange }: TextInputProp) {
  function handleSubmit() {
    console.log(title);
    onChange();
  }

  return (
    <>
      <main className="container mx-auto h-screen flex flex-col">
        <div className="grow p-6">
          <textarea
            className="textarea textarea-bordered resize-none w-full h-full text-lg"
            v-model="textInput"
            placeholder="输入待翻译的文本"
          ></textarea>
        </div>
        <div className="invisible p-6">
          <button className="btn">sitg</button>
        </div>
      </main>

      <div className="absolute bottom-0 left-0 w-screen bg-base-200">
        <div className="container mx-auto p-6 flex justify-end">
          <button
            className="btn btn-primary btn-md btn-block"
            onClick={handleSubmit}
          >
            提交
          </button>
        </div>
      </div>
    </>
  );
}
