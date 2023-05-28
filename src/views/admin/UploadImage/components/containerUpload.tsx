import { useState, ReactNode, FC } from "react";

export interface IProps {
  children: ReactNode[];
}
const ContainerUploadFile: FC<IProps> = ({ children }) => {
  return (
    <div className="flex w-1/2 flex-col items-center border-2 border-dashed border-gray-300 bg-transparent bg-white p-4 text-gray-400">
      {children}
    </div>
  );
};
export default ContainerUploadFile;
