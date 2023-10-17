import { ChangeEvent, useState } from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFormRegister,
  UseFieldArrayRemove
} from "react-hook-form";
import { ValidationType } from "@/schemas/apoyo-tecnico";

type TypeValidationStateForm = Omit<ValidationType, "">;

interface IProps {
  fields: FieldArrayWithId<TypeValidationStateForm, "armas", "id">[];
  append: UseFieldArrayAppend<TypeValidationStateForm, "armas">;
  register: UseFormRegister<TypeValidationStateForm>;
  Remove: UseFieldArrayRemove;
}
// TODO: Component
const FormArmas = ({ fields, append, register }: IProps) => {
  const [GenerateNumber, setGenerateNumber] = useState<number>(0);
  const [SelectValue, setSelectValue] = useState<string>("");

  const handleChangeNumberGenerate = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setGenerateNumber(value);
  };

  const ClickGenerator = () => {
    for (let i = 0; i < GenerateNumber; i++) {
      append({
        calibre: "",
        cantidad: "",
        tipo_fabricacion: "",
      });
    }
    setGenerateNumber(0);
  };
  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const select = e.target.value;
    setSelectValue(select);
  };

  return (
    <>
      <div className="px-2 pb-4">
        <div className=" flex flex-wrap">
          <div className="w-full px-2 md:w-1/2">
            <label htmlFor="arma">Arma</label>
            <div className="relative">
              <select
                id="arma"
                className="block w-full  form-select rounded border border-gray-300 px-4 py-2 pr-8 leading-tight text-gray-700 outline-offset-2 outline-transparent focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500  "
                {...register("tipo_arma")}
                onChange={handleChangeSelect}
              >
                <option value="">---</option>
                <option value="Blanca">Blanca</option>
                <option value="Fuego">Fuego</option>
              </select>
              
            </div>
          </div>

          <div className=" flex w-full justify-between px-2 md:w-1/2">
            <div className="w-full pr-2">
              <label htmlFor="arma">Ingrese (n) Cantidad</label>
              <input
                type="number"
                id="cedula_pasaporte"
                autoComplete="off"
                className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                onChange={handleChangeNumberGenerate}
              />
            </div>
            <div className="self-end">
              <button
                type="button"
                value={GenerateNumber}
                onClick={ClickGenerator}
                className="block rounded-md bg-blue-100 px-4 py-2 text-base font-bold text-blue-700 outline-offset-2 outline-transparent transition hover:bg-blue-200  focus:ring-2 "
              >
                Generar
              </button>
            </div>
          </div>
        </div>
        {/* Generate Arma Fuego */}
        <div className="mt-2 grid grid-cols-3 gap-4">
          {fields.map((item, index) => (
            <>
              {SelectValue == "Fuego" ? (
                <>
                  <div className="flex flex-wrap">
                    <div className="w-full px-2 ">
                      <label htmlFor="fabricacion_arma">Tipo Fabricacion</label>
                      <div className="relative">
                        <select
                          id="fabricacion_arma"
                          className="block w-full appearance-none  rounded border border-gray-300 px-4 py-2 pr-8 leading-tight text-gray-700 outline-offset-2 outline-transparent focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500  "
                          {...register(`armas.[${index}].tipo_fabricacion`)}
                        >
                          <option value="">---</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Artesanal">Artesanal</option>
                          <option value="Mixta">Mixta</option>
                        </select>
                        
                      </div>
                    </div>
                    <div className="w-full px-2">
                      <label htmlFor="cantidad">Cantidad</label>
                      <input
                        type="text"
                        id="cantidad"
                        autoComplete="off"
                        className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                        {...register(`armas.[${index}].cantidad`)}
                      />
                    </div>
                    <div className="w-full px-2 ">
                      <label htmlFor="calibre">Calibre</label>
                      <input
                        type="text"
                        id="calibre"
                        autoComplete="off"
                        className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                        {...register(`armas.[${index}].calibre`)}
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-wrap">
                    <div className="w-full px-2 ">
                      <label htmlFor="fabricacion_arma">Tipo Fabricacion</label>
                      <div className="relative">
                        <select
                          id="fabricacion_arma"
                          className="block w-full appearance-none  rounded border border-gray-300 px-4 py-2 pr-8 leading-tight text-gray-700 outline-offset-2 outline-transparent focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500  "
                          {...register(`armas.[${index}].tipo_fabricacion`)}
                        >
                          <option value="">---</option>
                          <option value="Comercial">Comercial</option>
                          <option value="Artesanal">Artesanal</option>
                        </select>
                        
                      </div>
                    </div>
                    <div className="w-full px-2 ">
                      <label htmlFor="cantidad">Cantidad</label>
                      <input
                        type="text"
                        id="cantidad"
                        autoComplete="off"
                        className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                        {...register(`armas.[${index}].cantidad`)}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          ))}
        </div>
        {/* Generate Arma blanca */}
      </div>
    </>
  );
};
export default FormArmas;
