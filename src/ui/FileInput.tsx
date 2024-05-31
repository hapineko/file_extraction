import { useState } from "react";

export default function FileInput(props: any) {
  const { label, name, register, setValue, history } = props;
  const [showHistory, setShowHistory] = useState(false);

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
    setValue(name, filePath);
  }

  function handleClickHistoryItem(filePath: string) {
    setValue(name, filePath);
    setShowHistory(false);
  }

  return (
    <div className="mt-4 flex items-center relative">
      <label className="mr-2 w-1/6" htmlFor={name}>
        {label}
      </label>
      <input
        className="border border-black p-1 w-3/6"
        type="text"
        name={name}
        id={name}
        required
        {...register(name)}
      />
      <button
        type="button"
        className="w-1/6 transition h-[34px] border-t border-b border-black bg-gray-300 hover:bg-gray-200"
        onClick={() => {
          if (showHistory) {
            setShowHistory(false);
          } else {
            setShowHistory(true);
          }
        }}
      >
        <div className="relative w-full h-full after:border-x-[8px] after:border-t-[16px] after:border-transparent after:border-t-black after:absolute after:top-[50%] after:left-[50%] after:translate-x-[-50%] after:translate-y-[-50%]"></div>
      </button>
      {showHistory && (
        <>
          <div
            className="fixed w-full h-full top-0 left-0"
            onClick={() => {
              setShowHistory(false);
            }}
          ></div>
          <ul className="absolute top-full left-[18%] border-l border-r border-b border-black bg-white p-1 z-10 w-[66%] max-h-16 overflow-y-auto">
            {history.map((item: string, index: number) => {
              return (
                <li
                  className="transition cursor-pointer hover:bg-gray-200"
                  key={index}
                  onClick={() => {
                    handleClickHistoryItem(item);
                  }}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </>
      )}
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
