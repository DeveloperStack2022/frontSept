import { ChangeEvent,FocusEvent,useState } from "react";

import {UseFormRegister} from "react-hook-form";
// Redux Slice
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {updateDatosGenerales} from '@/store/features/apoyo-tecnico'


import { ValidationType } from "@/schemas/apoyo-tecnico";
  
type TypeValidationStateForm = Omit<ValidationType, "">;

interface IProps {
    register: UseFormRegister<TypeValidationStateForm>;
}

const FormDatosGenerales  = ({register}:IProps) => {
    // state
    const [Data, setData] = useState<any>(null)

    const dispatch = useAppDispatch()
    const solicitudSelector = useAppSelector((state) => state.apoyoTecnico);



    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setData({
            ...solicitudSelector,
            [e.target.name]:e.target.value
        })
    }

    const handleOutFocusInput = (e:FocusEvent<HTMLInputElement>) => {
        dispatch(updateDatosGenerales({...Data}))
    }

    return (
        <>
            {/* Formulario */}
            <div  className="px-2 pb-4">
                <div className=" flex flex-wrap">
                    <div className="w-full md:w-1/2 px-2">
                        <label htmlFor="numero_caso">Numero Caso</label>
                        <input type="text" id="numero_caso"  {...register('numero_caso')}  className={`w-full py-2 pl-2 pr-2  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <label htmlFor="zona">Zona</label>
                        <input type="text" id="zona"  {...register('zona')}  className={`w-full py-2 pl-2 pr-2  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                    </div>
                </div>
                <div className=" flex flex-wrap">
                    <div className="w-full md:w-1/2 px-2">
                        <label htmlFor="sub_zona">Sub Zona</label>
                        <input type="text" id="sub_zona" {...register('sub_zona')}    className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <label htmlFor="distrito">Distrito</label>
                        <input type="text" id="distrito"  {...register('distrito')}  className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                    </div>
                </div>
                <div className="w-full px-2">
                    <label htmlFor="direccion">Direccion</label>
                    <input type="text" id="direccion" {...register('direccion')}  className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                </div>
                <div className="">
                    <label htmlFor="numero_caso" className="ml-2 font-semibold">Cordenadas</label>
                    <div className="flex ">
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="latitud" className="">Latitud</label>
                            <input type="text" id='latitud' {...register('latitud')}    className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <label htmlFor="longitud">longitud</label>
                            <input type="text" id='longitud' {...register('longitud')}  className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 px-2">
                        <label htmlFor="unidad_ejecutora">Unidad Ejecutora</label>
                        <input type="text" id="unidad_ejecutora" {...register('unidad_ejecutora')}   className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <label htmlFor="unidades_apoyo">Unidades de Apoyo</label>
                        <input type="text" id="unidades_apoyo"  {...register('unidades_apoyo')}   className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                    </div>
                </div>
            </div>
            
        </>
    )
}
export default FormDatosGenerales