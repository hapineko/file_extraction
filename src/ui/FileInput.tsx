import { useState } from "react";

export default function FileInput(props: any) {
  const { label, name } = props;

  const [inputTextValue, setInputTextValue] = useState("");

  function handleClickInputFile() {
    const inputFileElm = document.querySelector<HTMLInputElement>(
      `#${name}_file`
    );
    inputFileElm.click();
  }

  function handleChangeInputFile(event: React.ChangeEvent<HTMLInputElement>) {
    const inputFileElm = event.target;

    // ファイルパスを正規化
    const filePath = inputFileElm.files[0].path.replace(
      /(\/|\\)[^(\/|\\)]*$/,
      "$1"
    );
    setInputTextValue(filePath);
  }

  return (
    <div className="mt-4 flex items-center">
      <label className="mr-2 w-1/6" htmlFor={name}>
        {label}
      </label>
      <input
        className="border border-black p-1 w-4/6"
        type="text"
        name={name}
        id={name}
        value={inputTextValue}
        onChange={(event) => setInputTextValue(event.target.value)}
        required
      />
      <button
        className="transition border border-black bg-black text-white px-3 py-1 hover:bg-neutral-700 w-1/6"
        type="button"
        onClick={() => {
          handleClickInputFile();
        }}
      >
        選択
      </button>
      <input
        type="file"
        name={`${name}_file`}
        id={`${name}_file`}
        onChange={(event) => {
          handleChangeInputFile(event);
        }}
        /* @ts-expect-error */
        directory=""
        webkitdirectory=""
      />
    </div>
  );
}
