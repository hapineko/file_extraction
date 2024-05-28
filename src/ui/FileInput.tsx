export default function FileInput(props: any) {
  const { label, name } = props;

  function handleInputFile() {
    const inputFileElm = document.getElementById(`${name}_file`);
    inputFileElm.click();
  }

  return (
    <div className="mt-4">
      <label className="mr-2" htmlFor={name}>
        {label}
      </label>
      <input
        className="border border-black p-1 w-5/6"
        type="text"
        name={name}
        id={name}
      />
      <button
        className="transition border border-black bg-black text-white px-3 py-1 hover:bg-neutral-700 "
        type="button"
        onClick={() => {
          handleInputFile();
        }}
      >
        選択
      </button>
      <input type="file" name={`${name}_file`} id={`${name}_file`} />
    </div>
  );
}
