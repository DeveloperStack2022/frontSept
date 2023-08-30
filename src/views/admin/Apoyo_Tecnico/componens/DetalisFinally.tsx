// TODO: React Icons 
import DineroIcon from '@icons/ApoyoTecnico/dinero.svg?component'
import ArmaIcon from '@icons/ApoyoTecnico/arma.svg?component'
import UsersIcon from '@icons/ApoyoTecnico/users.svg?component'
import Vehiculo from '@icons/ApoyoTecnico/vehiculo.svg?component'
import PhoneIcon from '@icons/ApoyoTecnico/phone.svg?component'
import MunicionIcon from '@icons/ApoyoTecnico/municion.svg?component'

// TODO: Store Redux 
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {useState} from 'react'
// COMPONENTS
import NavBarInfo from './NavbarInfo'
// COMPONENTES TABS 
import UserInfo from './Components-Tab/UserInfo'
import ArmasTabComponent from './Components-Tab/ArmasTab'
import VehiculoTabComponent from './Components-Tab/VehiculoTab'

export default function DetalisFinally(){
    const apoyo_tecnico = useAppSelector(state => state.apoyoTecnico)
  
    const [ActiveTab, setActiveTab] = useState<number>(1)

    const handleClickActiveTab = (tabIndex:number) => {
        setActiveTab(tabIndex)
    }

    return (
        <>
            <NavBarInfo nombre_caso={apoyo_tecnico?.data?.numero_caso} total_celulares={2} detenidos={apoyo_tecnico.data?.detenidos.length} total_armas={apoyo_tecnico.data?.armas.length} total_vehiculos={apoyo_tecnico.data?.vehiculo.length} />
            <hr className="mx-4 mb-2" />
            <div className="grid grid-cols-2 gap-x-2">
                <div className="px-4">
                    <div className="grid grid-cols-2">
                        {/* TODO: Numero Caso */}
                        <div className="">
                            <span className="block font-semibold text-base">Numero Caso</span>
                            <span className="text-gray-500">{apoyo_tecnico?.data?.numero_caso}</span> 
                        </div>
                        {/* TODO: Distrito */}
                        <div className="flex justify-between">
                            <div className="">
                                <span className="block font-semibold text-base">Distrito</span> 
                                <span className="text-gray-500">{apoyo_tecnico?.data?.distrito}</span>
                            </div>
                            <div className="">  
                                <span className="block font-semibold text-base">Zona</span> 
                                <span className="text-gray-500">{apoyo_tecnico?.data?.zona}</span>
                            </div>
                            <div className="">
                                <span className="block font-semibold text-base">Sub Zona</span> 
                                <span className="text-gray-500">{apoyo_tecnico?.data?.sub_zona}</span>
                            </div>
                        </div>
                        {/* TODO: Direccion */}
                        <div className="">
                            <span className="block font-semibold text-base">Direccion:</span>
                            <span className="text-gray-500">{apoyo_tecnico?.data?.direccion}</span>
                        </div>
                        <div className="">
                            <span className="block  font-semibold text-base">Cordenadas</span>
                            <div className="flex justify-between">
                                <span className=""> <span className="font-semibold">Latitud: </span> <span className="text-gray-500">{apoyo_tecnico?.data?.latitud} </span></span> 
                                <span><span className="font-semibold">Longitud: </span> <span className="text-gray-500">{apoyo_tecnico?.data?.longitud}</span> </span>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="">
                                <span className="block font-semibold text-base">Unidad Ejecutora</span>
                                <span className="text-gray-500">{apoyo_tecnico?.data?.unidad_ejecutora}</span> 
                            </div>
                            <div className="">
                                <span className="block font-semibold text-base">Unidades de apoyo</span> 
                                <span className="text-gray-500 text-sm">{apoyo_tecnico?.data?.unidades_apoyo}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Caso */}
                <div className="px-4">
                    <span className="block font-semibold text-base">Asunto</span>
                    <p className="leading-3 md:text-sm text-gray-500">{apoyo_tecnico?.data?.asunto}</p>
                    <div className="flex justify-between">
                        <div className="">
                            <span className="block font-semibold text-base">Causa de Aprehesion:</span>
                            <span className="text-gray-500">{apoyo_tecnico?.data?.causa_aprehesion}</span>
                        </div>
                        <div className="">
                            <span className="block font-semibold text-base">Tipo de Delito</span> 
                            <span className="text-gray-500">{apoyo_tecnico?.data?.tipo_delito}</span>
                        </div>
                        <div className="">
                            <span className="block font-semibold text-base">GDO</span>
                            <span className="text-gray-500">{apoyo_tecnico?.data?.gdo_pertenciente} </span>
                        </div>
                    </div>

                </div>
            </div>
            {/* <hr className="mx-4 mb-2" /> */}
            {/* Tabs */}
            <nav className="p-4">
                <div className="flex">
                    <button className={`flex items-center justify-between px-4 py-2 gap-x-1 hover:bg-gray-50 ${ActiveTab == 1 ? 'border-b-2 border-blue-500 bg-gray-50': 'border-b-2 border-gray-200'} transition-all duration-300`} onClick={() => handleClickActiveTab(1)}>
                        <UsersIcon className={`h-6 w-6 ${ActiveTab == 1 ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className={`text-base  ${ActiveTab == 1 ?  'text-black' : 'text-gray-400'}`}>Detenidos</span>
                        <span className='border text-gray-400  text-sm font-medium  px-3 py-0.2 rounded-xl'>{apoyo_tecnico.data?.detenidos.length}</span>
                    </button>
                    <button
                        className={`flex items-center justify-between px-4 py-2 gap-x-1 hover:bg-gray-50 ${
                            ActiveTab === 2 ? 'border-b-2 border-blue-500 bg-gray-50' : 'border-b-2 border-gray-200'
                        } transition-all duration-300`}
                        onClick={() => handleClickActiveTab(2)}
                        >
                        <ArmaIcon className={`h-6 w-6 ${ActiveTab == 2 ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className={`text-base  ${ActiveTab == 2 ?  'text-black' : 'text-gray-400'}`}>Armas</span>
                        <span className='border text-gray-400  text-sm font-medium  px-3 py-0.2 rounded-xl'>{apoyo_tecnico.data?.armas.length}</span>
                    </button>
                    <button
                        className={`flex items-center justify-between px-4 py-2 gap-x-1 hover:bg-gray-50 ${
                            ActiveTab === 3 ? 'border-b-2 border-blue-500 bg-gray-50' : 'border-b-2 border-gray-200'
                        } transition-all duration-300`}
                        onClick={() => handleClickActiveTab(3)}
                        >
                        <PhoneIcon className={`h-5 w-5 ${ActiveTab == 3 ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className={`text-base  ${ActiveTab == 3 ?  'text-black' : 'text-gray-400'}`}>Celulares</span>
                        <span className='border text-gray-400  text-sm font-medium  px-3 py-0.2 rounded-xl'>2</span>
                    </button>
                    <button
                        className={` flex items-center justify-between px-4 py-2 gap-x-1 hover:bg-gray-50 ${
                            ActiveTab === 4 ? 'border-b-2 border-blue-500 bg-gray-50 ' : 'border-b-2 border-gray-200'
                        } transition-all duration-300`}
                        onClick={() => handleClickActiveTab(4)}
                        >
                        <Vehiculo className={`h-6 w-6 ${ActiveTab == 4 ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className={`text-base  ${ActiveTab == 4 ?  'text-black' : 'text-gray-400'}`}>Vehiculos</span>
                        <span className='border text-gray-400  text-sm font-medium  px-3 py-0.2 rounded-xl'>{apoyo_tecnico.data?.vehiculo.length}</span>
                    </button>
                    <button
                        className={`flex items-center justify-between px-4 py-2 gap-x-1 hover:bg-gray-50  ${
                            ActiveTab === 5 ? 'border-b-2 border-blue-500 bg-gray-50' : 'border-b-2 border-gray-200'
                        } transition-all duration-300`}
                        onClick={() => handleClickActiveTab(5)}
                        >
                        <MunicionIcon className={`h-6 w-6 ${ActiveTab == 5 ? 'text-blue-500' : 'text-gray-400'}`} />
                        <span className={`text-base  ${ActiveTab == 5 ?  'text-black' : 'text-gray-400'}`}>Municiones</span>
                        <span className='border text-gray-400  text-sm font-medium  px-3 py-0.2 rounded-xl'>{apoyo_tecnico.data?.municiones.length}</span>
                    </button>
                    <button
                        className={`flex items-center px-4 py-2 gap-x-1 hover:bg-gray-50 ${
                            ActiveTab === 6 ? 'border-b-2 border-blue-500 bg-gray-50' : 'border-b-2 border-gray-200'
                        } transition-all duration-300`}
                        onClick={() => handleClickActiveTab(6)}
                        >
                            <DineroIcon className={`h-6 w-6 ${ActiveTab == 6 ? 'text-blue-500' : 'text-gray-400'}`} />
                            <span className={`text-base ${ActiveTab == 6 ?  'text-black' : 'text-gray-400'}`}>Dinero</span>
                            <span className='border text-gray-400  text-sm font-medium  px-3 py-0.2 rounded-xl'>0</span>
                    </button>
                </div>
            </nav>
            <div className="grid grid-cols-3 p-4 gap-x-2">

                {ActiveTab == 1 && (
                    <>
                        {apoyo_tecnico?.data?.detenidos.map((item,index) => (
                            <UserInfo ciudadania={item.ciudadania} nombres_completos={item.nombre_completos} numero_cedula={item.n_identificacion} sexo={item.sexo} />
                        ))}
                    </>
                )}
                {ActiveTab == 2 && (
                    <>
                        {apoyo_tecnico?.data?.armas.map((item,index) => (
                            <ArmasTabComponent tipo_arma={apoyo_tecnico?.data?.tipo_arma} cantidad={parseInt(item.cantidad)} tipo_fabricacion={item.tipo_fabricacion} calibre={item.calibre} />
                        ))}
                    </>
                )}
                {ActiveTab == 4 && (
                    <>
                        {apoyo_tecnico?.data?.vehiculo.map((item,index) => (
                            <VehiculoTabComponent marca={item.marca} modelo={item.modelo} placa={item.placa} tipo_vehiculo={item.tipo_vehiculo} />
                        ))}
                    </>
                )}
            </div>
        </>
    )
}