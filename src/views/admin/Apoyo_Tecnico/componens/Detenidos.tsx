import { ChangeEvent, FocusEvent, useState } from "react";
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
// Redux Slice
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateDetenidos } from "@/store/features/apoyo-tecnico";
import { ValidationType } from "@/schemas/apoyo-tecnico";

type TypeValidationStateForm = Omit<ValidationType, "">;

interface IProps {
  fields: FieldArrayWithId<TypeValidationStateForm, "detenidos", "id">[];
  append: UseFieldArrayAppend<TypeValidationStateForm, "detenidos">;
  register: UseFormRegister<TypeValidationStateForm>;
  RemoveDetenidos: UseFieldArrayRemove
}

const DetenidosForm = ({ fields, append, register,RemoveDetenidos }: IProps) => {
  const [Data, setData] = useState<any>(null);
  const [FieldsGenerate, setFieldsGenerate] = useState<number>(0);

  const dispatch = useAppDispatch();

  const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...Data,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    dispatch(updateDetenidos({ ...Data }));
  };
  const handleNumberGenerate = (e: ChangeEvent<HTMLInputElement>) => {
    const numero: number = parseInt(e.target.value);
    setFieldsGenerate(numero);
  };

  const genrateFilds = () => {
    for (let i = 0; i < FieldsGenerate; i++) {
      append({
        ciudadania: "",
        n_identificacion: "",
        nombre_completos: "",
        sexo: "",
        tipo_identificacion: "",
      });
    }
  };

  return (
    <>
      <div  className="px-2 pb-4">
        <div className=" flex flex-wrap">
          <div className=" md:w-2/2 flex w-full justify-between px-2">
            <div className="w-full pr-2">
              <label htmlFor="ingre_n_cantidad">
                Ingrese (n) Cantidad de Detenidos
              </label>
              <input
                type="number"
                id="ingre_n_cantidad"
                autoComplete="off"
                className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                onChange={handleNumberGenerate}
              />
            </div>
            <div className="self-end">
              <button
                type="button"
                className="block rounded-md bg-blue-100 px-4 py-2 text-base font-bold text-blue-700 outline-offset-2 outline-transparent transition hover:bg-blue-200  focus:ring-2 "
                onClick={genrateFilds}
              >
                Generar
              </button>
            </div>
          </div>
        </div>
        {/* Generates */}
        <div className="mt-2 grid grid-cols-3 gap-4  ">
          {fields.map((item, index) => (
            <div className="flex flex-wrap rounded-md border">
              <div className="w-full px-2 md:w-1/2">
                <label htmlFor="ciudadania">Ciudadania</label>
                <input
                  {...register(`detenidos.[${index}].ciudadania`)}
                  type="text"
                  id="ciudadania"
                  className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div className="w-full px-2 md:w-1/2">
                <label htmlFor="cedula_pasaporte">N.Identificacion</label>
                <input
                  {...register(`detenidos.[${index}].n_identificacion`)}
                  type="text"
                  id="cedula_pasaporte"
                  className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div className="w-full px-2">
                <label htmlFor="nombre_apellidos">Nombre - Apellidos</label>
                <input
                  {...register(`detenidos.[${index}].nombre_completos`)}
                  type="text"
                  id="nombre_apellidos"
                  className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              <div className="flex flex-wrap px-2">
                <label htmlFor="sexo" className="block w-full">
                  Sexo
                </label>
                <div className="flex w-full gap-x-2 px-2 md:w-1/2">
                  <div className="flex items-center">
                    <input
                      value='Masculino'
                      {...register(`detenidos.[${index}].sexo`)}
                      type="radio"
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 "
                    />
                    <label
                      htmlFor="masculino"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Masculino
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      value='Femenino'
                      {...register(`detenidos.[${index}].sexo`)}
                      type="radio"
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500 "
                    />
                    <label
                      
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Femenino
                    </label>
                  </div>
                  </div>
                  </div>
                  <div className="w-full flex justify-center my-2">
                    <button className="bg-red-500 text-white px-2 py-1 rounded-md w-3/4 hover:bg-red-600 transition-all" onClick={() => RemoveDetenidos(index)}>Eliminar</button>
                  </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DetenidosForm;
