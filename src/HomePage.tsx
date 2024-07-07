import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import classNames from "classnames";

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
  const [errorModal, setErrorModal] = useState(false);
  const [errorLog, setErrorLog] = useState("");
  const [sourceHistory, setSourceHistory] = useState([]);
  const [destinationHistory, setDestinationHistory] = useState([]);

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
      // 履歴を更新する
      if (!sourceHistory.includes(data.source)) {
        setSourceHistory([...sourceHistory, data.source]);
      }
      if (!destinationHistory.includes(data.destination)) {
        setDestinationHistory([...destinationHistory, data.destination]);
      }

      // 抽出完了のモーダルを表示する
      setSuccessModal(true);
      setTimeout(() => {
        setSuccessModal(false);
      }, 2000);
    } else {
      setErrorLog(result);
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
          label="抽出元："
          name="source"
          register={register}
          setValue={setValue}
          history={sourceHistory}
        />
        <FileInput
          label="抽出先："
          name="destination"
          register={register}
          setValue={setValue}
          history={destinationHistory}
        />
        <p className="mt-2 text-xs text-red-700">
          ※MacOSの場合、空のフォルダを指定する際は直接ファイルパスを入力してください。
          <br />
          （OSの仕様上、「選択」から空のフォルダを選択した場合はファイルパスが取得できないため）
        </p>
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
      <div
        className={classNames(
          "invisible absolute top-0 left-0 w-full h-full bg-black text-white opacity-0 transition-all",
          loading && "visible opacity-50"
        )}
      >
        <div className="flex justify-center items-center h-full">抽出中……</div>
      </div>
      <div
        className={classNames(
          "transition-all w-full bg-green-700 text-white p-4 text-center absolute top-1/2 opacity-0",
          !successModal && "invisible",
          successModal && "visible opacity-100"
        )}
      >
        抽出が完了しました
      </div>
      <div
        className={classNames(
          "invisible absolute top-0 w-full h-full bg-overlay-color cursor-pointer opacity-0 transition-all",
          errorModal && "visible opacity-100"
        )}
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
    </div>
  );
}
