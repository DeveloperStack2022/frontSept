import {
    FieldArrayWithId,
    UseFieldArrayAppend,
    UseFormRegister,
  } from "react-hook-form";
  import {ChangeEvent, useState} from 'react'
  import { ValidationType } from "@/schemas/apoyo-tecnico";
  
  type TypeValidationStateForm = Omit<ValidationType, "">;
  
  interface IProps {
    fields: FieldArrayWithId<TypeValidationStateForm, "sustancias_sujetas_fiscalizacion", "id">[];
    append: UseFieldArrayAppend<TypeValidationStateForm, "sustancias_sujetas_fiscalizacion">;
    register: UseFormRegister<TypeValidationStateForm>;
  }
  
  export default function FormSustanciasSujetasFiscalizacion({ append, fields, register }: IProps) {
  
    const [NumberGenerate, setNumberGenerate] = useState(0)
  
    const handleChangeNumberGenerate = (e:ChangeEvent<HTMLInputElement>) => setNumberGenerate(parseInt(e.target.value)) 
    const handleClickGenerate = () => {
      for(let i=0; i < NumberGenerate; i++) {
        append({
          descripcion_logotipo:'',
          descripcion_marquilla:'',
          peso_neto:'',
          tipo_droga:''
        })
      }
    }
  
    return (
      <>
        <div  className="px-2 pb-4">
          <div className=" flex flex-wrap">
            <div className=" md:w-2/2 flex w-full justify-between px-2">
              <div className="w-full pr-2">
                <label htmlFor="arma">Ingrese (n) Cantidad de Sustancias</label>
                <input
                  type="number"
                  id="cedula_pasaporte"
                  autoComplete="off"
                  className={`block w-full rounded-md border-0 pl-2 py-1.5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
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
          <div className="mt-2 grid grid-cols-2 gap-1  ">
            {fields.map((item,index) => (
              <div className=" flex flex-wrap rounded-md border">
                <div className="w-full md:w-1/2 px-2">
                  <label htmlFor="tipo_droga">Tipo De Droga</label>
                  <div className="relative ">
                    <select
                    {...register(`sustancias_sujetas_fiscalizacion.[${index}].tipo_droga`)}
                      id="tipo_droga"
                      className="block w-full rounded-md border-0 py-1.5 pr-14 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 "
                    >
                      <option value="">---</option>
                      <option value="Marihuana">Marihuana</option>
                      <option value="Cocaina">Cocaina</option>
                      <option value="Heroina">Heroina</option>
                      <option value="Otros">Otros</option>
                    </select>
                  </div>
                </div>
                <div className="relative w-full px-2 md:w-1/2 ">
                  <label htmlFor="peso_neto">Peso Neto</label>
                  <div className="relative">
                    <input
                      {...register(`sustancias_sujetas_fiscalizacion.[${index}].peso_neto`)}
                      type="text"
                      id="peso_neto"
                      autoComplete="off"
                      className={`block w-full rounded-md border-0 py-1.5 pr-14 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6`}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center">
                        <select {...register(`sustancias_sujetas_fiscalizacion.[${index}].medida_peso`)} className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm">
                          <option value="gr">Gr</option>
                          <option value="kg">Kg</option>
                        </select>
                    </div>
                  </div>
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <label htmlFor="logo_tipo">Logotipo</label>
                  <div className="border-2 border-dashed w-full h-16 flex justify-center items-center  bg-gray-50 hover:cursor-pointer">
                    <span className="font-semibold text-gray-500 ">Upload</span>
                  </div>
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <label htmlFor="marquilla">Agregar Descripcion</label>
                  <textarea rows={3} className="block p-2.5 w-full text-sm text-gray-900 leading-[14px]  rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"  />
                </div>

                <div className="w-full px-2 md:w-1/2">
                  <label htmlFor="marquilla">Marquilla</label>
                  <div className="border-2 border-dashed w-full h-16 flex justify-center items-center  bg-gray-50 hover:cursor-pointer">
                    <span className="font-semibold text-gray-500 ">Upload</span>
                  </div>
                </div>
                <div className="w-full px-2 md:w-1/2">
                  <label htmlFor="marquilla">Agregar Descripcion</label>
                  <textarea rows={3}  className="block p-2.5 w-full text-sm text-gray-900 leading-[14px]  rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  