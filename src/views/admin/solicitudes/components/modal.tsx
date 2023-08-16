import {FC} from 'react'
import {SolicitudAction} from '@/schemas/solicitud-schema'

// TODO: Icon
import IconUser from '@icons/user.svg?component'

type Props = {
    isOpen: boolean;
    onClose: () => void;
    data: SolicitudAction
    status:string
}

const ModalShowDataSolicitud:FC<Props> = ({isOpen,onClose,data,status}) => {
    
    return (
        <div className={`fixed flex justify-center items-center top-0 left-0 right-0 z-50  p-4  md:inset-0  max-h-full bg-black/[.54] ${!isOpen && 'hidden'}`}>
            <div className="relative w-full max-w-md h-full ">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={() => onClose()} type='button' className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white '>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
                            </path>
                        </svg>
                    </button>
                    <div className="p-6 text-center">
                        <h3 className='font-semibold text-xl mt-2'>Detalles completos de la solicitud</h3>
                        {status == 'succeeded' ? (
                            <div className="flex  justify-center flex-col mt-4 ">
                                {/* Datos Solicitantes */}
                                <div className='border-b-gray-300 '>
                                        {/* Box information del solicitante */}
                                        <div className="flex">
                                            <div className="bg-blue-200 inline-block p-3 rounded-full h-12 w-12">
                                                {/* Icon user */}
                                                <IconUser className='h-6 w-6' />
                                            </div>
                                            <div className="flex flex-col ml-4">
                                                {/* Nombres completos */}
                                                <p className='text-base  font-semibold self-start text-left'>{`${data.solicitante_result[0]?.grado} ${data.solicitante_result[0]?.nombres_completos}`}</p>
                                                {/* Unidad */}
                                                <span className='text-gray-400 text-sm text-left'>{data.solicitante_result[0]?.unidad}</span>
                                            </div>
                                        </div>
                                </div>
                                {/* Datos Solicitud */}
                                <div className="mt-2 text-left">
                                    <p> <span className='font-bold'>Fecha:</span> <span className='uppercase text-gray-700'>{new Date(data.fecha).toLocaleDateString()}</span> <span className='font-bold'>Hora: </span> <span className='uppercase text-gray-700'>{data.hora}</span> </p>
                                    {/* Datos Juridicos */}
                                    <p> <span className='font-bold '>Fiscal o Juridico:</span> <span className='uppercase text-gray-700'>{data.nombre_fiscal ? data.nombre_fiscal : "---"}</span></p>
                                    <p> <span className='font-bold '>Fiscalia:</span> <span className='uppercase text-gray-700'>{data.nombre_fiscalia ? data.nombre_fiscalia : "---"}</span></p>
                                    {/* Separator */}
                                    <hr className='divide-x' />
                                    {/* Fecha */}
                                    {/* Delito */}
                                    <p> <span className='font-bold '>Delito:</span> <span className='uppercase text-gray-700'>{data.delito ? data.delito : "---"}</span></p>
                                    {/* Caso */}
                                    <p> <span className='font-bold '>Caso:</span> <span className='uppercase text-gray-700'>{data.caso ? data.caso : "---"}</span></p>
                                    {/* Organizacion delicuencial */}
                                    <p> <span className='font-bold '>GDO:</span> <span className='uppercase text-gray-700'>{data.organizacion_delicuencial ? data.organizacion_delicuencial : "---"}</span></p>
                                </div>
                                {/* Datos celular - ubicacion */}
                                <div className=" mt-2  grid grid-cols-2 text-left h-72 overflow-y-scroll">
                                    {data.celulares_solicitados.map((e,index) => (
                                        <div className="" key={index}>
                                            <p className='font-bold text-blue-600'>Numero celular {index + 1}</p>
                                            {/* Numero celular */}
                                            <p> <span className='font-semibold'>Numero</span> <span>{e.numero_celular}</span></p>
                                            {/* Imsi */}
                                            <p> <span className='font-bold'>Imsi</span> <span>{e.imsi}</span></p>
                                            {/* Latitud */}
                                            <p> <span className='font-bold'>Latitud</span> <span>{data.ubicaciones_celulares[index].latitud ? data.ubicaciones_celulares[index].latitud : "---"}</span></p>
                                            {/* Longitud */}
                                            <p> <span className='font-bold'>Longitud</span> <span>{data.ubicaciones_celulares[index].longitud ? data.ubicaciones_celulares[index].longitud : "---"}</span></p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ): "loading"}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalShowDataSolicitud;
