import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// ui
import FileInput from "./ui/FileInput";
import Textarea from "./ui/Textarea";

interface Window {
  image: {
    read: (srcPath: string) => string;
  };
  extraction: {
    copy: (datas: {
      source: string;
      destination: string;
      extract: string[];
    }) => string;
  };
}
declare var window: Window;

export default function HomePage() {
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [errorModal, setErrorModal] = useState(true);

  // ロゴ読み込み
  async function readLogo() {
    const encodedImage = await window.image.read("/public/images/logo.png");
    setLogo(encodedImage);
  }
  readLogo();

  interface IFormInput {
    source: string;
    destination: string;
    extract: string;
  }

  // フォーム送信時の制御
  let errorLog = "";
  const { register, handleSubmit, setValue } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    const fixExtract = data.extract.split("\n");
    const result = await window.extraction.copy({
      source: data.source,
      destination: data.destination,
      extract: fixExtract,
    });
    setLoading(false);
    if (result === "success") {
      setSuccessModal(true);
      setTimeout(() => {
        setSuccessModal(false);
      }, 2000);
    } else {
      errorLog = result;
      setErrorModal(true);
    }
  };

  return (
    <div className="mb-8">
      {/* logo */}
      <p className="mt-8">
        <img className="mx-auto my-0" src={`data:image/png;base64,${logo}`} />
      </p>
      <form className="mt-8 px-8" onSubmit={handleSubmit(onSubmit)}>
        <FileInput
          label="抽出元"
          name="source"
          register={register}
          setValue={setValue}
        />
        <FileInput
          label="抽出先"
          name="destination"
          register={register}
          setValue={setValue}
        />
        <Textarea
          label="抽出したいファイル／フォルダ"
          name="extract"
          register={register}
        />
        <div className="mt-6 text-center">
          <button className="transition border border-black bg-black text-white px-3 py-1 hover:bg-neutral-700">
            抽出する
          </button>
        </div>
      </form>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-black text-white opacity-50">
          <div className="flex justify-center items-center h-full">
            抽出中……
          </div>
        </div>
      )}
      {successModal && (
        <div className="w-full bg-green-700 text-white p-4 text-center absolute top-1/2">
          抽出が完了しました
        </div>
      )}
      {errorModal && (
        <div
          className="absolute top-0 w-full h-full bg-overlay-color cursor-pointer"
          onClick={() => {
            setErrorModal(false);
          }}
        >
          <div className="flex justify-center items-center h-full">
            <div className="w-full">
              <div className="w-full bg-red-700 text-white p-4 text-center">
                抽出に失敗しました
              </div>
              <div className="w-full bg-white p-4">{errorLog}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
