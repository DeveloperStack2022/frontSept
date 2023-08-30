import {useState} from 'react'
import {UseFormRegister} from "react-hook-form";
import { ValidationType } from "@/schemas/apoyo-tecnico";
import DatePicker from 'react-datepicker'
import {format} from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'


type TypeValidationStateForm = Omit<ValidationType, "">;

interface IProps {
    register: UseFormRegister<TypeValidationStateForm>;
}

const FormDatosGenerales  = ({register}:IProps) => {
    // state
    const [date, setDate] = useState<Date | null>(new Date());   

    return (
        <>
            {/* Formulario */}
            <div  className="px-2 pb-4">
                <div className=" flex flex-wrap"  >
                    <div className="w-full md:w-1/2 px-2">
                        <label htmlFor="numero_caso" className='block' >Fecha</label>
                        <DatePicker 
                            dateFormat={'dd-MM-y'}
                            selected={date}
                            onChange={(date) => setDate(date)}
                            customInput={<input {...register('fecha')}  className='w-full py-2 pl-2 pr-2  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm' />} 
                            renderCustomHeader={({date,decreaseMonth,increaseMonth,prevMonthButtonDisabled,nextMonthButtonDisabled}) =>  (
                            <div className="flex items-center justify-between px-2 py-2">
                                <span className="text-lg text-gray-700">
                                    {format(date, 'MMMM yyyy')}
                                </span>
                                <div className="space-x-2">
                                    <button
                                        onClick={decreaseMonth}
                                        disabled={prevMonthButtonDisabled}
                                        type="button"
                                        className={`
                                            ${prevMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                                    >
                                        {"<"}
                                    </button>

                                    <button
                                        onClick={increaseMonth}
                                        disabled={nextMonthButtonDisabled}
                                        type="button"
                                        className={`
                                            ${nextMonthButtonDisabled && 'cursor-not-allowed opacity-50'}
                                            inline-flex p-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500
                                        `}
                                        >
                                            {">"}
                                    </button>
                                </div>
                            </div>
                        )}/>
                    </div>
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