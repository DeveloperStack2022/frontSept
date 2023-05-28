import { useRef, ChangeEvent, useState } from "react";
import UploadSvgComplete from "@/icons/upload-complete.svg?component";
import UploadContainer from "./components/containerUpload";
const UploadFileExcel = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentFile, setCurrentFile] = useState<File>();
  const [Progress, setProgress] = useState<number>(0);

  const selectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const selectFile_ = e.target.files as FileList;
    setCurrentFile(selectFile_?.[0]);
  };

  const handleClickUploadFile = () => {
    inputRef.current?.click();
  };

  return (
    <UploadContainer>
      {/* Image Vector Upload File */}
      <UploadSvgComplete className="" />
      <h2 className="mb-2 text-center text-2xl font-medium text-gray-700">
        Upload file
      </h2>
      <h3 className="w-1/2 text-center leading-4">
        Subir archivo excel segun corresponda su mes de ingreso
      </h3>
      <input
        accept="image/*"
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={selectImage}
      />
      <button
        onClick={handleClickUploadFile}
        className="mt-2 rounded-sm border border-blue-600 px-6 py-2 text-lg text-blue-500 hover:bg-blue-600/10"
      >
        Subir Archivo
      </button>
      <span className="mt-4 text-sm">
        formato permitido <span className="font-bold text-gray-700">.xlsx</span>
      </span>
    </UploadContainer>
  );
};

export default UploadFileExcel;
