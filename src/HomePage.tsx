import { useState } from "react";

// ui
import FileInput from "./ui/FileInput";
import Textarea from "./ui/Textarea";

interface Window {
  image: {
    read: (srcPath: string) => string;
  };
}
declare var window: Window;

export default function HomePage() {
  const [logo, setLogo] = useState("");

  async function readLogo() {
    const encodedImage = await window.image.read("/public/images/logo.png");
    setLogo(encodedImage);
  }
  readLogo();

  return (
    <div>
      {/* logo */}
      <p className="mt-8">
        <img className="mx-auto my-0" src={`data:image/jpg;base64,${logo}`} />
      </p>
      <form action="/" className="mt-8 px-8">
        <FileInput label="抽出元" name="source" />
        <FileInput label="抽出先" name="destination" />
        <Textarea label="抽出したいファイル／フォルダ" name="extract" />
        <div className="mt-6 text-center">
          <button className="transition border border-black bg-black text-white px-3 py-1 hover:bg-neutral-700">
            抽出する
          </button>
        </div>
      </form>
    </div>
  );
}
