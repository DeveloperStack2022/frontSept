import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFormRegister,
} from "react-hook-form";
import { ValidationType } from "@/schemas/apoyo-tecnico";
import { ChangeEvent,useState } from "react";

type TypeValidationStateForm = Omit<ValidationType, "">;

interface IProps {
  fields: FieldArrayWithId<TypeValidationStateForm, "dinero", "id">[];
  append: UseFieldArrayAppend<TypeValidationStateForm, "dinero">;
  register: UseFormRegister<TypeValidationStateForm>;
}

export default function FormDinero({ fields,append,register }: IProps) {
  const [NumberGenerate, setNumberGenerate] = useState<number>(0)
  
  const handleGenerate = (e: ChangeEvent<HTMLInputElement>) => {
    const element = parseInt(e.target.value) 
    setNumberGenerate(element) 
  }
  
  const handleClickGenerator = () => {
    for(let i=0; i < NumberGenerate; i++){
      append({
        tipo_divisa:'',
        valor_total:''
      })
    }
  }

  
  return (
    <>
      <div  className="px-2 pb-4">
        <div className=" flex flex-wrap">
          <div className=" md:w-2/2 flex w-full justify-between px-2">
            <div className="w-full pr-2">
              <label htmlFor="arma">
                Ingrese (n) Cantidad de divisas
              </label>
              <input
                type="number"
                id="cedula_pasaporte"
                autoComplete="off"
                className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                onChange={handleGenerate}
              />
            </div>
            <div className="self-end">
              <button
                type="button"
                className="block rounded-md bg-blue-100 px-4 py-2 text-base font-bold text-blue-700 outline-offset-2 outline-transparent transition hover:bg-blue-200  focus:ring-2 "
                onClick={handleClickGenerator}
              >
                Generar
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {fields.map((item,index) => (
            <div className=" flex flex-wrap">
            <div className="w-full px-2 md:w-1/2">
              <label htmlFor="fabricacion_arma">Tipo De Divisa</label>
              <div className="relative">
                <select
                  id="fabricacion_arma"
                  className="block w-full appearance-none  rounded border border-gray-300 px-4 py-2 pr-8 leading-tight text-gray-700 outline-offset-2 outline-transparent focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500  "
                  {...register(`dinero.[${index}].tipo_divisa`)}
                >
                  <option value="">---</option>
                  <option value="Pesos Colombianos">Pesos Colombianos</option>
                  <option value="Soles Peruanos">Soles Peruano</option>
                  <option value="Dolares Americanos">Dolares Americanos</option>
                </select>
                
              </div>
            </div>
            <div className="w-full px-2 md:w-1/2">
              <label htmlFor="cantidad">Valor Total</label>
              <input
                type="text"
                id="cantidad"
                autoComplete="off"
                className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                {...register(`dinero.[${index}].valor_total`)}
              />
            </div>
          </div>
          ))}
          
        </div>
      </div>
    </>
  );
}
