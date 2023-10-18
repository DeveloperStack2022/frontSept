import {useState,useRef,ChangeEvent,useEffect} from 'react'
// Validations Forms
import {useForm,useFieldArray} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
// Schema validation
import ValidationDataSchema,{ValidationType} from '@/schemas/form'
// Services HTTP 
import {addSolicitud,searchSolicitudByNumero} from '@/services/solicitud-services'
// Custom hooks 
import {useLocalStorage} from '@/hooks/useLocalStorage'
import Card from '@components/card'
// REDUX: Redux Storage
import {useAppDispatch,useAppSelector} from '@/hooks/redux'

import {informationSolicitud,SolicitudNumero,removeInformationSolicitud} from '@/store/features/search_solicitud_num_celular'

import FingerPrintIcon from '@/icons/finger-printer.svg?component'
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
import SearchPhoneIcon from '@/icons/search-phone.svg?component'
import XIcon from '@/icons/x-icon.svg?component'
import SearchIcon from '@/icons/search-icon.svg?component'
import HashIcon from '@/icons/hash-icon.svg?component'
import PhoneNumber from '@/icons/number-phone.svg?component'

// Components 
import ModalComponent from '@components/modal'

// Utils 
import {validor_nro_cl} from '@/utils/utils'



// FIXME: Toast 
import {useToast} from '@/components/toast/toastProvider'

// // // TODO: Start Querys Grapqhl
//FIXME: Apollo Client
import {useQuery,useLazyQuery} from '@apollo/client'
import {GetAnalistaByNumCl,GetAnalistaByUnidad,GetAnalistaByGrado} from '@/schemas/gql/analista'

// TODO: End Query 


type TypeValidationStateForm = Omit<ValidationType,'celulares' | 'hora'>

const AddSolicitudForm = () => {
    // FIXME: - - - - - - - Graphql - - - - - - - - 
    const  [runQuery] = useLazyQuery(GetAnalistaByNumCl)
    const [runQueryGetAnalistaByUnidad] = useLazyQuery(GetAnalistaByUnidad)
    const [runQueryGetAnalistaByGrado] = useLazyQuery(GetAnalistaByGrado)
    
    //       - - - - - - -  End Graphql - - - - - - 
    // FIXME: Redux 
    const dispatch = useAppDispatch()
    const stateSelector = useAppSelector(state => state.solicitudSearch)
    // FIXME: States 

    const refInput = useRef<HTMLInputElement>(null)
    const [MessageNotification, setMessageNotification] = useState<{status:boolean,message:string} | null>(null)
    const [ShowMessage, setShowMessage] = useState<boolean>(false)
    const [NnumeroCelulares, setNnumeroCelulares] = useState<number>(0)
    const [OpenModal, setOpenModal] = useState<boolean>(false)
    const [ModalContent, setModalContent] = useState<{message:string,status:number}>({message:'',status:0})
    const [formData, setFormData] = useState<SolicitudNumero>({
        Analista:{
            grado:"",
            nombre_completos:"",
            unidad:'',
            zona:'',
        },
        Solicitud:{
            caso:'',
            delito:'',
            investigacion_previa:'',
            organizacion:''
        }
    })
    const [CheckIP, setCheckIP] = useState<boolean>(false)
    // Custom Hooks 
    const {getItem} = useLocalStorage()
    const toast = useToast()
    // React hooks form
    const {register,handleSubmit,watch,control,reset,formState:{errors},setValue,trigger} = useForm<ValidationType>({resolver: yupResolver(ValidationDataSchema),mode:'onBlur'})
    const {fields,append,remove} = useFieldArray<ValidationType,'celulares'>({control,name:'celulares'})
    

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const keyCode = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);
    
        if (!/^[0-9]*$/.test(keyValue)) {
          event.preventDefault();
        }
    };

    const handleSubmitArrowFunction = async (data:ValidationType) => {
        let token = getItem('authToken')
        token = JSON.parse(token)?.accessToken
        const ubicaciones = data.celulares.map(e => {return {latitud: e.latitud, longitud: e.longitud}})
        const celulares = data.celulares.map(e => {return {numero_celular: e.numero_celular, imsi: e.imsi}})

        try {
            const response = await addSolicitud(data,token,ubicaciones,celulares)
            setModalContent({message:response?.data,status:response?.status})
        } catch (err) {
            console.log(err)
        }
        reset()
        handleOpenModal()
    }

    const handleGenerateFormsCelular = (value:any) => {
        for(let i=0; i < NnumeroCelulares; i++){
            append(value)    
        }
        setNnumeroCelulares(0)
    }

    const handleOpenModal = () =>  setOpenModal(true)

    const handleCloseModal = () => {
        let i = 0
        do {
            remove(i)
            i++
        }while(i < fields.length)
        remove(0)
        dispatch(removeInformationSolicitud())
        setOpenModal(prev => !prev)
    }

    const handleSearch = async () => {
 
        const valueInputSearch = refInput.current?.value as string
        if(valueInputSearch !== '' && !!valueInputSearch){
          
            const {data,status} = await searchSolicitudByNumero(valueInputSearch,'')
            
            let response:SolicitudNumero = data
            if(status == 200){
                
                dispatch(informationSolicitud({
                    Analista:{
                        grado:response.Analista.grado,
                        nombre_completos: response.Analista.nombre_completos,
                        unidad: response.Analista.unidad,
                        zona: response.Analista.zona
                    },
                    Solicitud:{
                        caso: response.Solicitud.caso,
                        delito: response.Solicitud.delito,
                        investigacion_previa: response.Solicitud.investigacion_previa,
                        organizacion: response.Solicitud.organizacion
                    }
                }))
            }
            
            if(status == 204){ // Code 204 -> No Content
                setMessageNotification({message:'Numero no encontrado',status:true})
                setShowMessage(prev => !prev)
            }            
        }
    }
    
    const handleClickShow = () => {
        setShowMessage(prev => !prev)
    }


    useEffect(() => {
        if(stateSelector.status) {
            setFormData({
                Analista:{...stateSelector.Analista},
                Solicitud:{...stateSelector.Solicitud}
            })
            setValue('delito',stateSelector.Solicitud.delito)
            setValue('nombre_caso',stateSelector.Solicitud.caso)
            setValue('grupo_delicuencial',stateSelector.Solicitud.organizacion)
            setValue('investigacion_previa',stateSelector.Solicitud.investigacion_previa)

            setValue('grado',stateSelector.Analista.grado)
            setValue('nombres_apellidos',stateSelector.Analista.nombre_completos)
            setValue('unidad',stateSelector.Analista.unidad)
            setValue('zona',stateSelector.Analista.zona)
        }
    
      return () => {
        
      }
    }, [stateSelector.status])
    
    const handleChangeCasoStr = (e:ChangeEvent<HTMLInputElement>) => {
       
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    // const validador_nro_cl = async (e:ChangeEvent<HTMLInputElement>) => {
    //     const  value = e.target.value
    //     // const valores = validor_nro_cl(value)
    //     // console.log(valores)
    //     const {data:Data} = await runQuery({variables:{numeroCedula:value}})
        
    //     if(!Data?.getAnalistaByNumCl) {
    //         toast?.pushError('Usuario No Encontrado',40000,'truncate-1-lines')
    //         return
    //     }

    //     const {grado,nombres,unidad,zona} = Data?.getAnalistaByNumCl
    //     setValue('grado',grado)
    //     setValue('nombres_apellidos',nombres)
    //     setValue('unidad',unidad.nombre_unidad)
    //     setValue('zona',zona.nombre_zona.toString())
    // }

    // const validador_grado = async (e:ChangeEvent<HTMLInputElement>) => {
    //     const value = e.target.value
    //     const {data:DataAnalistaByGrado} = await runQueryGetAnalistaByGrado({variables:{grado:value}})

    //     if(DataAnalistaByGrado?.getAnalistaByGrado?.analistas.length == 0){
    //         toast?.pushError('Analistas no encontrados',40000,'truncate-1-lines')
    //         return
    //     }
    // }
    const validador_unidad = async (e: ChangeEvent<HTMLInputElement>) => {}
    const validaor_zona = async (e:ChangeEvent<HTMLInputElement>) => {}
    
    return (
        <Card>
            <ModalComponent isOpen={OpenModal} onClose={handleCloseModal} status={(ModalContent?.status > 200 && ModalContent?.status < 300 ) ? 'success' : 'error' } message={(ModalContent?.status > 200 && ModalContent?.status < 300 ) ? 'Solicitud agregada exitosamente' : ModalContent.message } >
                <div>
                    
                </div>
            </ModalComponent>
            <form onSubmit={handleSubmit(handleSubmitArrowFunction)} >
                <div className="grid grid-cols-2 gap-x-5 p-6">
                    <div className="">
                        <h4 className='font-semibold text-md' >Datos solicitud</h4>
                            <div className="">
                                <label htmlFor='num_celular'  className="inline-block text-sm font-medium text-gray-500 mb-1 hover:cursor-pointer">Buscar Numero Celular</label>
                                <div className="flex gap-x-2 justify-between">
                                    <div className="relative w-full">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <SearchPhoneIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                        </div>
                                        <input ref={refInput} type="text" id='num_celular'  className='w-full py-2 pr-7 pl-9 block rounded-md  bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm' autoComplete='off'  />
                                    </div>
                                    <button onClick={handleSearch} type="button" className='font-bold px-4 py-2 text-green-700 bg-green-100 hover:bg-green-200 transition  rounded-md outline-offset-2 outline-transparent ring-green-300  focus:ring-2 text-sm flex items-center gap-x-2'> <SearchIcon className="h-4 w-4" /> <span>Buscar</span></button>
                                </div>
                                {ShowMessage && MessageNotification?.status && (
                                    <div className='bg-red-200 px-4 py-2 my-1 rounded-sm flex justify-between items-center'>
                                        <span className='text-red-500'>{MessageNotification.message}</span>
                                        <XIcon className='h-5 w-5 hover:cursor-pointer' onClick={handleClickShow} /> 
                                    </div>
                                )}
                           </div>
                            <input type="hidden" {...register('hora')} defaultValue={`${new Date().getHours}`} />
                            <input type="hidden" {...register('plataforma')} defaultValue={'Septier'} />
                            <div className="">
                                <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Nombre Fiscal </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <UserIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        value={formData.nombre_fical}
                                        {...register("nombre_fical")}
                                        onChange={handleChangeCasoStr}
                                        placeholder="Nombre Fiscal"
                                        className={`w-full py-2 pr-7 pl-9 block rounded-md  bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors.nombre_caso?.message && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Nombre Fiscalia </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <UnidadIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        value={formData.nombre_fiscalia}
                                        {...register("nombre_fiscalia")}
                                        onChange={handleChangeCasoStr}
                                        placeholder="Nombre Fiscalia"
                                        className={`w-full py-2 pr-7 pl-9 block rounded-md  bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors.nombre_caso?.message && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Nombre del Caso {errors.nombre_caso?.message && <span className='text-red-500 text-xs'>*{errors.nombre_caso?.message}*</span>} </label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <FingerPrintIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        value={formData.nombre_caso}
                                        {...register("nombre_caso")}
                                        onChange={handleChangeCasoStr}
                                        placeholder="Nombre del caso"
                                        className={`w-full py-2 pr-7 pl-9 block rounded-md  bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors.nombre_caso?.message && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
                                        autoComplete="off"
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
                                        {...register('delito')} 
                                        onChange={handleChangeCasoStr}
                                        value={formData.delito}
                                        placeholder="Delito"
                                        className={`w-full py-2 pr-7 pl-8 block rounded-md bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors.delito?.message && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label  className="block text-sm font-medium text-gray-500">Alias</label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <UserIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        {...register('alias')}
                                        onChange={handleChangeCasoStr}
                                        value={formData.alias}
                                        placeholder="Alias"
                                        className="w-full py-2 pr-7 pl-8 block rounded-md bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm" 
                                        autoComplete="off"
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
                                        {...register('grupo_delicuencial')}
                                        onChange={handleChangeCasoStr}
                                        value={formData.grupo_delicuencial}
                                        placeholder="Grupo Delicuencial"
                                        className="w-full py-2 pr-7 pl-8 block rounded-md bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm" 
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex  justify-between w-full mt-2">
                                <div className="w-[90px]">
                                    <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Flagrancia</label>
                                    <div className="flex justify-between items-center">
                                        <label htmlFor="si_flagrancia">
                                            <input type="radio"  id="si_flagrancia" value={'Si_Flagrancia'} {...register('tipo_pedido')}  /> Si
                                        </label>
                                        <label htmlFor="no_flagrancia">
                                            <input type="radio"  id="no_flagrancia" value={'No_Flagrancia'} {...register('tipo_pedido')} />  No
                                        </label>
                                    </div>
                                </div>
                                <div className="">
                                    <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Acto Urgente</label>
                                    <div className="flex justify-between items-center  ">
                                        <label htmlFor="si_ActoUrgente">
                                            <input type="radio"  id="si_ActoUrgente" value={'Si_ActoUrgente'}  {...register('tipo_pedido')} /> Si
                                        </label>
                                        <label htmlFor="no_ActoUrgente">
                                            <input type="radio"  id="no_ActoUrgente" value={'No_ActoUrgente'}  {...register('tipo_pedido')}/>  No
                                        </label>
                                    </div>
                                </div>
                                <div className="">
                                    <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Investigacion Previa</label>
                                    <div className="flex justify-between items-center  ">
                                        <label htmlFor="si_IP">
                                            <input type="radio"  id="si_IP" value={'Si_IP'} {...register('tipo_pedido')} onChange={() => setCheckIP(true)}   /> Si
                                        </label>
                                        <label htmlFor="no_IP">
                                            <input type="radio"  id="no_IP" value={'No_IP'} {...register('tipo_pedido')} onChange={() => setCheckIP(false)}  />  No
                                        </label>
                                    </div>
                                </div>

                            </div>
                            {CheckIP && (
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
                                            {...register('investigacion_previa',{
                                                required: CheckIP
                                            })}
                                            onChange={handleChangeCasoStr}
                                            value={formData.investigacion_previa}
                                        />
                                    </div>
                                </div>
                            )}
                    </div>
                    {/* Box 2 */}
                    <div className="">
                        <h4 className='font-semibold text-md' >Datos solicitante</h4>
                            <div className="">
                                <label htmlFor='numero_cedula' className='text-gray-500 text-sm font-medium'>Numero Cedula</label>
                                <div className="relative mt-1 rounded-md sgadiw-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <HashIcon  className='absolute mr-6 w-5 h-5 text-gray-500'/>
                                    </div>
                                    <input type="text" id='numero_cedula' className='py-2 pr-2 pl-8 w-full block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm' 
                                        {...register('numero_cedula')}
                                        // onBlur={(value) => validador_nro_cl(value)}
                                    />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <svg className="animate-spin h-5 w-5 text-blue-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Numero Celular {errors.numero_celular?.message && <span className='text-red-500 text-xs'>*{errors.numero_celular.message}*</span>}</label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <PhoneNumber className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        className={`w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors.numero_celular?.message && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`}
                                        autoComplete="off"
                                        {...register('numero_celular')}
                                        onChange={handleChangeCasoStr}
                                        value={formData.numero_celular}
                                    />
                                </div>
                            </div>
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
                                        // onBlur={(value) => validador_grado(value)}
                                        onChange={handleChangeCasoStr}
                                        value={formData.grado}
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
                                        onChange={handleChangeCasoStr}
                                        value={formData.nombres_apellidos}
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
                                        
                                        onChange={handleChangeCasoStr}
                                        value={formData.unidad}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <label  className="flex justify-between items-center text-sm font-medium text-gray-500">Zona {errors.zona?.message && <span className='text-red-500 text-xs'>*{errors.zona?.message}*</span> }</label>
                                <div className="relative mt-1 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <ZonaIcon className="absolute mr-6 w-5 h-5 text-gray-500" />
                                    </div>
                                    <input
                                        {...register('zona')}
                                        onChange={handleChangeCasoStr}
                                        value={formData.zona}
                                        className={`w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm ${errors.zona?.message && 'border border-red-500 focus:border-red-500 focus:ring-red-500'}`} 
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