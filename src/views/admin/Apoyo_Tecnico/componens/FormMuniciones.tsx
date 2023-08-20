import { ChangeEvent, useState } from "react";

import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFormRegister,
} from "react-hook-form";

import { ValidationType } from "@/schemas/apoyo-tecnico";

type TypeValidationStateForm = Omit<ValidationType, "">;

interface IProps {
  fields: FieldArrayWithId<TypeValidationStateForm, "municiones", "id">[];
  append: UseFieldArrayAppend<TypeValidationStateForm, "municiones">;
  register: UseFormRegister<TypeValidationStateForm>;
}
export default function FormMuniciones({ append, fields, register }: IProps) {
  const [NumberGenerate, setNumberGenerate] = useState<number>(0);

  const hanldeGenerate = (e: ChangeEvent<HTMLInputElement>) => {
    const numero = parseInt(e.target.value);
    setNumberGenerate(numero);
  };

  const handleButtonGenerate = () => {
    for (let i = 0; i < NumberGenerate; i++) {
      append({
        calibre: "",
        cantidad: "",
        tipo_municion: "",
      });
    }
  };

  return (
    <>
      <form action="" className="px-2 pb-4">
        <div className=" flex flex-wrap">
          <div className=" md:w-2/2 flex w-full justify-between px-2">
            <div className="w-full pr-2">
              <label htmlFor="arma">
                Ingrese (n) Cantidad de tipo de municiones
              </label>
              <input
                type="number"
                id="cedula_pasaporte"
                autoComplete="off"
                className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                onChange={hanldeGenerate}
              />
            </div>
            <div className="self-end">
              <button
                type="button"
                className="block rounded-md bg-blue-100 px-4 py-2 text-base font-bold text-blue-700 outline-offset-2 outline-transparent transition hover:bg-blue-200  focus:ring-2 "
                onClick={handleButtonGenerate}
              >
                Generar
              </button>
            </div>
          </div>
        </div>
        {/* Generate Arma Fuego */}
        <div className="flex flex-wrap">
          <div className="w-full px-2 md:w-1/3">
            <label htmlFor="fabricacion_arma">Tipo Municion</label>
            <div className="relative">
              <select
                id="fabricacion_arma"
                className="block w-full appearance-none  rounded border border-gray-300 px-4 py-2 pr-8 leading-tight text-gray-700 outline-offset-2 outline-transparent focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500  "
              >
                <option value="">---</option>
                <option value="Arma_Larga">Arma Larga</option>
                <option value="Arma_Corta">Arma Corta</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="w-full px-2 md:w-1/3">
            <label htmlFor="cantidad">Cantidad</label>
            <input
              type="text"
              id="cantidad"
              autoComplete="off"
              className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <div className="w-full px-2 md:w-1/3">
            <label htmlFor="calibre">Calibre</label>
            <input
              type="text"
              id="calibre"
              autoComplete="off"
              className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
            />
          </div>
        </div>
      </form>
    </>
  );
}
