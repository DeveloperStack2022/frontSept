// REACT: Hooks React | Events Types
import {ChangeEvent,useState,FocusEvent} from 'react'
import {FieldArrayWithId,UseFieldArrayAppend,UseFormRegister,UseFieldArrayRemove} from 'react-hook-form'
import { ValidationType } from "@/schemas/apoyo-tecnico";

// REDUX: Hooks Redux 
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { updateDetenidos } from "@/store/features/apoyo-tecnico";

type TypeValidationStateForm = Omit<ValidationType, "">;

interface IProps {
    fields: FieldArrayWithId<TypeValidationStateForm, "celulares", "id">[];
    append: UseFieldArrayAppend<TypeValidationStateForm, "celulares">;
    register: UseFormRegister<TypeValidationStateForm>;
    Remove: UseFieldArrayRemove;
}


// COMPONENT: FORM CELULARES
const FormCelularStep = ({fields,append,register}:IProps) => {
    const [Data, setData] = useState<any>(null);
    const [FieldsGenerate, setFieldsGenerate] = useState<number>(0);
    
    const dispatch = useAppDispatch();
    // HANDLE: Change Event
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
            marca:'',
            modelo:'',
            numero:''
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
                        Ingrese (n) Cantidad medios electronicos encontrados
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
                        <label htmlFor={`marca_${index}`}>Marca</label>
                        <input
                        {...register(`celulares.[${index}].marca`)}
                        type="text"
                        id={`marca_${index}`}
                        className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                    <div className="w-full px-2 md:w-1/2">
                        <label htmlFor={`modelo_${index}`}>Modelo</label>
                        <input
                        {...register(`celulares.[${index}].modelo`)}
                        type="text"
                        id={`modelo_${index}`}
                        className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                    <div className="w-full px-2">
                        <label htmlFor={`numero_${index}`}>Numero Celular</label>
                        <input
                        {...register(`celulares.[${index}].numero`)}
                        type="text"
                        id={`numero_${index}`}
                        className={`block w-full rounded-md border  border-gray-300 py-2 pl-2 pr-7 text-sm outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default FormCelularStep 