import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFormRegister,
} from "react-hook-form";
import {ChangeEvent, useState} from 'react'
import { ValidationType } from "@/schemas/apoyo-tecnico";

type TypeValidationStateForm = Omit<ValidationType, "">;

interface IProps {
  fields: FieldArrayWithId<TypeValidationStateForm, "vehiculo", "id">[];
  append: UseFieldArrayAppend<TypeValidationStateForm, "vehiculo">;
  register: UseFormRegister<TypeValidationStateForm>;
}

export default function FormVehiculo({ append, fields, register }: IProps) {

  const [NumberGenerate, setNumberGenerate] = useState(0)

  const handleChangeNumberGenerate = (e:ChangeEvent<HTMLInputElement>) => setNumberGenerate(parseInt(e.target.value)) 
  const handleClickGenerate = () => {
    for(let i=0; i < NumberGenerate; i++) {
      append({
        tipo_vehiculo:'',
        marca:'',
        modelo:'',
        placa:''
      })
    }
  }

  return (
    <>
      <div className="px-2 pb-4">
        <div className=" flex flex-wrap">
          <div className=" md:w-2/2 flex w-full justify-between px-2">
            <div className="w-full pr-2">
              <label htmlFor="arma">Ingrese (n) Cantidad de Vehiculos</label>
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
                className="block rounded-md bg-blue-100 px-4 py-2 text-base font-bold text-blue-700 outline-offset-2 outline-transparent transition hover:bg-blue-200  focus:ring-2 "
                onClick={handleClickGenerate}
              >
                Generar
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1  ">
          {fields.map((item,index) => (
            <div className=" flex flex-wrap rounded-md border">
              <div className="w-full px-2">
                <label htmlFor="fabricacion_arma">Tipo De Vehiculo</label>
                <div className="relative">
                  <select
                    id="fabricacion_arma"
                    className="block w-full appearance-none  rounded border border-gray-300 px-4 py-2 pr-8 leading-tight text-gray-700 outline-offset-2 outline-transparent focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500  "
                    {...register(`vehiculo.[${index}].tipo_vehiculo`)}
                  >
                    <option value="">---</option>
                    <option value="Moto">Moto</option>
                    <option value="Carro">Carro</option>
                  </select>
                  
                </div>
              </div>
              <div className="w-full px-2 md:w-1/2">
                <label htmlFor="cantidad">Marca</label>
                <input
                  type="text"
                  id="cantidad"
                  autoComplete="off"
                  className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                  {...register(`vehiculo.[${index}].marca`)}
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <label htmlFor="cantidad">Modelo</label>
                <input
                  type="text"
                  id="cantidad"
                  autoComplete="off"
                  className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                  {...register(`vehiculo.[${index}].modelo`)}
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <label htmlFor="cantidad">Placa</label>
                <input
                  type="text"
                  id="cantidad"
                  autoComplete="off"
                  className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                  {...register(`vehiculo.[${index}].placa`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
