import {KeyboardEvent,useState} from 'react'
// Validations Forms
import {useForm,useFieldArray,Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
// Schema validation
import ValidationDataSchema,{ValidationType} from '@/schemas/form'

import Card from '@components/card'
import FingerPrintIcon from '@/icons/finger-printer.svg?component'
import EventoIcon from '@/icons/evento-icon.svg?component'
import DelitoIcon from '@/icons/delito.svg?component'
import GroupIcon from '@icons/group.svg?component'
import InvestigacionIcon from '@icons/investigacion.svg?component'
import UnidadIcon from '@icons/unidad_policial.svg?component'
import UserIcon from '@icons/user.svg?component'
import GradoIcon from '@/icons/grado.svg?component'
import ZonaIcon from '@/icons/zona.svg?component'
import MobileIcon from '@/icons/mobile.svg?component'
import MoreIcon from '@/icons/more.svg?component'
import LongitudIcon from '@/icons/longitud.svg?component'
import LatitudIcon from '@/icons/latitud.svg?component'
import DeleteIcon from '@icons/delete-icon.svg?component'

// Components 
import ModalComponent from '@components/modal'


const AddSolicitudForm = () => {
    // FIXME: States 
    const [NnumeroCelulares, setNnumeroCelulares] = useState<number>(0)
    const [OpenModal, setOpenModal] = useState<boolean>(false)

    // React hooks form
    const {register,handleSubmit,watch,control,reset,formState:{errors}} = useForm<ValidationType>({mode:"onBlur",resolver: yupResolver(ValidationDataSchema)})

    const {fields,append,remove} = useFieldArray<ValidationType,'celulares'>({control,name:'celulares'})

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
    
        if (!/^[0-9]*$/.test(keyValue)) {
          event.preventDefault();
        }
    };

    const handleSubmitArrowFunction = (data:ValidationType) => {
        console.log(data)
        
        let i = 0
        do {
            remove(i)
            i++
        }while(i < fields.length)
        
        reset()
        remove(0)
        handleOpenModal()
    }

    const handleGenerateFormsCelular = (value) => {
        append(value)    
    }

    const handleOpenModal = () =>  setOpenModal(true)
    const handleCloseModal = () => setOpenModal(prev => !prev)

    
    return (
        <Card>
            <ModalComponent isOpen={OpenModal} onClose={handleCloseModal} >
                <div>
                    test
                </div>
            </ModalComponent>
            <form onSubmit={handleSubmit(handleSubmitArrowFunction)} >
                <div className="grid grid-cols-2 gap-x-5 p-6">
                    <div className="">
                            <h4 className='font-semibold text-md' >Datos solicitud</h4>
                            <div className="">
                                <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Nombre del Caso {errors.nombre_caso?.message && <span className='text-red-500 text-xs'>*{errors.nombre_caso?.message}*</span>} </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <FingerPrintIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        placeholder="Nombre del caso"
                                        className={`w-full py-2 pr-7 pl-9 block rounded-md  bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors.nombre_caso?.message && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
                                        autoComplete="off"
                                        {...register("nombre_caso")}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Evento {errors.evento?.message && <span className='text-red-500 text-xs'> *{errors.evento?.message}*</span>}</label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <EventoIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        placeholder="Evento"
                                        className={`w-full py-2 pr-7 pl-8 block rounded-md  bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors.evento?.message && 'border border-red-500  focus:border-red-500 focus:ring-red-500'}`} 
                                        autoComplete="off"
                                        {...register("evento")}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Delito {errors.delito?.message && <span className="text-red-500 text-xs">*{errors.delito?.message}*</span>}</label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <DelitoIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        placeholder="Delito"
                                        className={`w-full py-2 pr-7 pl-8 block rounded-md bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors.delito?.message && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
                                        autoComplete="off"
                                        {...register('delito')}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label  className="block text-sm font-medium text-gray-500">Grupo Delicuencial</label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <GroupIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        placeholder="Grupo Delicuencial"
                                        className="w-full py-2 pr-7 pl-8 block rounded-md bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm" 
                                        autoComplete="off"
                                        {...register('grupo_delicuencial')}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Investigacion Previa (IP) {errors.investigacion_previa?.message && <span className='text-red-500 text-xs'>*{errors.investigacion_previa?.message}*</span>} </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <InvestigacionIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        onKeyPress={handleKeyPress}
                                        className={`w-full py-2 pr-7 pl-8 block rounded-md bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors.investigacion_previa?.message && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
                                        autoComplete="off"
                                        {...register('investigacion_previa')}
                                    />
                                </div>
                            </div>
                    </div>
                    {/* Box 2 */}
                    <div className="">
                        <h4 className='font-semibold text-md' >Datos solicitante</h4>
                            <div className="">
                                <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Grado {errors.grado?.message && <span className='text-red-500 text-xs'>*{errors.grado.message}*</span>}</label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <GradoIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        placeholder="Grado"
                                        className={`w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors.grado?.message && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
                                        autoComplete="off"
                                        {...register('grado')}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Nombres / Apellidos {errors.nombres_apellidos?.message && <span className='text-red-500 text-xs'>*{errors.nombres_apellidos.message}*</span> } </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <UserIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        placeholder="Nombres / Apellidos"
                                        className={`w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors.nombres_apellidos?.message && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`} 
                                        autoComplete="off"
                                        {...register('nombres_apellidos')}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label  className="block text-sm font-medium text-gray-500">Unidad</label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <UnidadIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        placeholder="Unidad"
                                        className="w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm" 
                                        autoComplete="off"
                                        {...register('unidad')}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label  className="block text-sm font-medium text-gray-500">Zona</label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <ZonaIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        placeholder="Zona"
                                        className="w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm" 
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label className='block text-sm font-medium text-gray-500'>Agregar (n) numero celulares solicitados</label>
                                <div className="flex items-center gap-x-2 mt-1 ">
                                    <input
                                        value={NnumeroCelulares}
                                        onChange={(e) => {setNnumeroCelulares(parseInt(e.target.value))} }
                                        onKeyPress={handleKeyPress}
                                        className="w-full py-2 pr-7 pl-2 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm" 
                                        autoComplete="off"
                                        type='number'
                                    />
                                    <button type="button" className='font-bold px-4 py-2 text-blue-700 bg-blue-100 hover:bg-blue-200 transition block rounded-md outline-offset-2 outline-transparent  focus:ring-2 text-sm' onClick={() => handleGenerateFormsCelular({imsi:"",latitud:"",longitud:"",numero_celular:""})}>Generar</button>
                                </div>
                            </div>
                    </div>
                </div>
                {/* Datos Celulares */}
                <div className="px-6">
                    {fields?.length > 0 && <h4 className='font-semibold text-md' >Datos Celular</h4> }
                    <div className="grid grid-cols-4 gap-x-5 ">
                        {fields.map((field,index) => (
                            <div key={field.id}>
                                <div className="mb-2">
                                    <label className="flex justify-between items-center text-sm font-medium text-gray-500">
                                        Num Celular #{index + 1 } {errors?.['celulares']?.[index]?.['numero_celular']?.['message'] && <span className='text-red-500 font-semibold' style={{fontSize:'.7rem'}}> *{errors?.['celulares']?.[index]?.['numero_celular']?.['message']}* </span>}
                                    
                                    </label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MobileIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                        </div>
                                        <input
                                            {...register(`celulares[${index}].numero_celular`)}
                                            className={`w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors?.['celulares']?.[index]?.['numero_celular']?.['message'] && 'border-red-500 ring-1 ring-red-500'}`} 
                                            autoComplete="off"
                                        />
                                        
                                        {/* <span className="text-red-500"> {errors?.celulares.[index].numero_celular?.message}</span> */}
                                    </div>
                                </div>
                                <div className="">
                                    <label className="flex justify-between text-sm font-medium text-gray-500">Imsi {errors?.['celulares']?.[index]?.['imsi']?.['message'] && <span className='text-red-500 font-semibold' style={{fontSize:'.7rem'}}> *{errors?.['celulares']?.[index]?.['imsi']?.['message']}* </span>}</label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <MoreIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                        </div>
                                        <input
                                            {...register(`celulares[${index}].imsi`)}
                                            className="w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm" 
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                <div className="">
                                    <label  className={`flex justify-between text-sm font-medium text-gray-500 `}>Latitud 
                                         {errors?.['celulares']?.[index]?.['latitud']?.['message'] && <span className='text-red-500 font-semibold' style={{fontSize:'.7rem'}}> *{errors?.['celulares']?.[index]?.['latitud']?.['message']}* </span>}
                                    </label>
                                    <div className="relative mt-1 ">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <LatitudIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                        </div>
                                        <input
                                            {...register(`celulares[${index}].latitud`)}
                                            className={`w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors?.['celulares']?.[index]?.['latitud']?.['message'] && 'border-red-500 ring-1 ring-red-500'}`} 
                                            autoComplete="off"
                                        />
                                    </div>
                                    
                                </div>
                                <div className="">
                                    <label className="flex justify-between text-sm font-medium text-gray-500">Longitud {errors?.['celulares']?.[index]?.['longitud']?.['message'] && <span className='text-red-500 font-semibold' style={{fontSize:'.7rem'}}> *{errors?.['celulares']?.[index]?.['longitud']?.['message']}* </span>}</label>
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <LongitudIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                        </div>
                                        <input
                                            {...register(`celulares[${index}].longitud`)}
                                            className={`w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors?.['celulares']?.[index]?.['longitud']?.['message'] && 'border-red-500 ring-1 ring-red-500'}`} 
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>
                                <button className='flex justify-center items-center gap-x-2 font-bold px-4 py-2 bg-red-100 hover:bg-red-200 transition text-red-700   rounded-md  outline-offset-2 outline-transparent focus:border-red-500 focus:ring-2 focus:ring-red-500 text-sm w-28  mt-2' onClick={() => {remove(index)} }><DeleteIcon className="h-4 w-4 stroke-current" /> Eliminar</button>
                            </div>
                         ))}
                            
                    </div>
                </div>
                <input className='font-semibold px-4 py-2 bg-blue-700 hover:bg-blue-800 transition text-white  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-sm w-28 m-6 mt-2 hover:cursor-pointer' type='submit' value={'Enviar'}  />
            </form>
        </Card>
    )
}
export default AddSolicitudForm