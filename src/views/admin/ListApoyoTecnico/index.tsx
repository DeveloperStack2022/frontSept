import {useState,useCallback,useEffect,KeyboardEvent} from 'react'
import {getApoyoTecnico,getApoyoTecnicoById} from '@/services/apoyo-tecnico-services'
import Table from './components/table'
import Modal from './components/ModalPresenter'
import CardsCantidad from './components/Cards'
import {SingleDataPresentation} from '@/schemas/apoyo-tecnico'

const imgUrl = new URL('/public/img/presentacion.png', import.meta.url).href
const imgAnexoUrl = new URL('/public/img/imagen_anexo.png', import.meta.url).href

// Icons 
import User from '@/icons/user.svg?component'
import Armas from '@/icons/ApoyoTecnico/arma.svg?component'
import Municiones from '@/icons/ApoyoTecnico/municion.svg?component'
import Vehiculo from '@/icons/ApoyoTecnico/vehiculo.svg?component'
import Dinero from '@/icons/ApoyoTecnico/dinero.svg?component'
import SustanciasIlegales from '@/icons/ApoyoTecnico/sustancias_ilegales.svg?component'

const formatData = (obj:any) => {
    if(obj){
        const objKeys = Object.keys(obj)
        const objValues = Object.values(obj)
        return objKeys.map((item,i) => (
            <p className='text-[#002060] text-xl font-medium leading-5 uppercase'>{item} : {objValues[i]}</p>
        ))
    }
}


export default function ApoyoTecnico(){

    // FIXME: STATE OF TABLES
    const [Search,setSearch] = useState('')
    const [Data, setData] = useState([])
    // REACT: States of Modal 
    const [ShowModal, setShowModal] = useState<boolean>(false)
    const [DataModal,setDataModal] = useState<SingleDataPresentation | null>(null)

    const fetchDataApi = async () => {
        try {
            const data = await getApoyoTecnico()
            setData(data?.data)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchData = useCallback(
        () => {
        fetchDataApi();
        },
        [Search]
    );

    useEffect(() => {
        // Execute function async
        if (Data.length == 0) {
            fetchDataApi();
        }
        return () => {};
    }, [Data]);

    const onClose = () => setShowModal(false)
    const openModal = async (id:string) => {
        const data = await getApoyoTecnicoById(id)
        setDataModal(data?.data)
        setShowModal(true)
    }

    
    return (
        <>
            <Modal isOpen={ShowModal} onClose={onClose} >
                <div className="relative bg-white rounded-sm shadow p-2">
                    <div className='bg-cover bg-center w-[1280px] h-[720px]' style={{backgroundImage:`url('${imgUrl}')`}}>
                        {/* TODO: Contenido */}
                        <div className="absolute top-[90px] left-14 w-[259px]    ">
                            <p className='text-[#002060] text-xl font-bold  text-center'>“{DataModal?.nombre_caso}”</p>
                        </div>
                        {/* TODO: UNIDAD EJECUTORA */}
                        <div className="absolute top-[212px] left-9">
                            <span className='text-[#002060] text-xl font-bold '>{DataModal?.ejecutor}</span>
                        </div>
                        {/* TODO: UBICACION */}
                        <div className="absolute top-[316px] left-9 w-[325px]">
                            <p className='text-[#002060] text-lg leading-5'>{DataModal?.direccion}</p>
                        </div>
                        {/* TODO: LATITUD */}
                        <div className="absolute top-[360px] left-9 w-[325px]">
                            <span className='text-[#002060] text-lg -leading-3'> {DataModal?.latitud} {DataModal?.longitud} </span>
                        </div>
                        {/* TODO: CORDINACION */}
                        <div className="absolute top-[414px] left-9 w-[325px]">
                            <span className='text-[#002060] text-lg  block'> - UNCI</span>
                            <span className='text-[#002060] text-lg '> - UN-BAC</span>
                        </div>
                        {/* TODO: DELITO - CONTRAVENCION */}
                        <div className="absolute top-[578px] left-9 w-[325px]">
                            <p className='text-[#002060] text-lg  block '> {DataModal?.delito}</p>
                        </div>
                        {/* TODO: Contexto */}
                        <div className="absolute top-[167px] left-[383px] w-[454px]">
                            <p className='text-gray-800 text-xl font-medium leading-5'>{DataModal?.contexto}</p>
                        </div>
                        <div className="absolute top-[100px] left-[860px] w-[454px]">
                            <p className='text-[#002060] text-xl font-medium leading-5 uppercase'>{DataModal?.detenidos} {DataModal?.detenidos as number > 1 ? "Personas Detenidas":"Persona Detenida"}</p>
                        </div>
                        <div className="absolute top-[143px] left-[860px] w-[454px]">
                            <p className='text-[#002060] text-2xl font-bold leading-5 uppercase'>Indicios</p>
                        </div>
                        <div className="absolute top-[175px] left-[860px] w-[454px]">
                            {/* {!!DataModal?.indicios && (
                                Object.values(DataModal?.indicios).map(items => (
                                        <p className='text-[#002060] text-xl font-medium leading-5 uppercase'>{items}</p>        
                                    ))
                            )} */}
                            {formatData(DataModal?.indicios)}
                        </div>
                        <div className="absolute top-[430px] left-[366px] w-[909px] h-[285px] bg-cover bg-center bg-no-repeat " style={{backgroundImage:`url('${imgAnexoUrl}')`}}></div>

                    </div>
                </div>
            </Modal>
            <h2 className='text-3xl font-semibold mb-4'>Reporte Mensuales</h2>
            <div className="grid grid-cols-4 gap-x-4">
                {[{title:'Total Detenidos',numero:23,icon:User},{title:'Total Armas',numero:50,icon:Armas},{title:'Total Sustancias Sujetas F...',numero:200,otro:'kg',icon:SustanciasIlegales},{title:'Total Vehiculos',numero:50,icon:Vehiculo},{title:'Total Dinero',numero:200,icon:Dinero,otro:'Dolares Americanos'},{title:'Total Municiones',numero:5000,icon:Municiones}].map((item) => (
                    <CardsCantidad otro={item.otro}  Icon={item.icon!} title_card={item.title} numero={item.numero} />
                ))}
            </div>
            
            <Table openModal={openModal} data={Data}  loading={false} />
        </>
    )
}