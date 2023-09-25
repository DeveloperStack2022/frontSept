import {useState,useCallback,useEffect,forwardRef, MouseEventHandler} from 'react'
import {getApoyoTecnico,getApoyoTecnicoById,getApoyoTecnicoResultsTotal,getApoyoTecnicoResultsTotalByParamas} from '@/services/apoyo-tecnico-services'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Table from './components/table'
import Modal from './components/ModalPresenter'
import CardsCantidad from './components/Cards'
import {SingleDataPresentation,TotalResultados} from '@/schemas/apoyo-tecnico'
import {format} from 'date-fns'

const URI_IMG = import.meta.env.VITE_API_URL_IMAGE
const imgUrl = new URL('/public/img/presentacion.png', import.meta.url).href
// const imgAnexoUrl = new URL(`/public/img/imagen_anexo.png`, import.meta.url).href

// Icons 
import User from '@/icons/user.svg?component'
import Armas from '@/icons/ApoyoTecnico/arma.svg?component'
import Municiones from '@/icons/ApoyoTecnico/municion.svg?component'
import Vehiculo from '@/icons/ApoyoTecnico/vehiculo.svg?component'
import Dinero from '@/icons/ApoyoTecnico/dinero.svg?component'
import SustanciasIlegales from '@/icons/ApoyoTecnico/sustancias_ilegales.svg?component'


type SustanciasIlegales = {
    medida_peso:string
    peso_neto:string;
    tipo_droga:string;
}

const formDataArray = (arrayObj:SustanciasIlegales[]) => {
    if(arrayObj){
        return arrayObj.length > 0 && arrayObj.map(item => (
            <p className='text-[#002060] text-xl font-medium leading-5 uppercase'>{item.tipo_droga}: {item.peso_neto}{item.medida_peso}</p>
        ))
    }
}

const formatData = (obj:any) => {
    if(obj){
        const objKeys = Object.keys(obj)
        const objValues = Object.values(obj)
        return objKeys.map((item,i) => (
            <>
                {objValues[i] as number > 0 && (
                    <p className='text-[#002060] text-xl font-medium leading-5 uppercase'>{item} : {objValues[i]}</p>
                ) }
            </>
        ))
    }
}

export default function ApoyoTecnico(){

    // FIXME: STATE OF TABLES
    const [Search,setSearch] = useState('')
    const [Data, setData] = useState([])
    // REACT: States of Modal 
    const [ShowModal, setShowModal] = useState<boolean>(false)
    const [DataModal,setDataModal] = useState<SingleDataPresentation>({contexto:'',delito:'',detenidos:0,direccion:'',ejecutor:'',fecha:new Date(),indicios:'',latitud:'',longitud:'',name_image:'',nombre_caso:'',tipo_operativo:''})
    const [DataTotalResultados,setDataTotalResultados] = useState<{loading:boolean,TotalResultados:TotalResultados,error:boolean}>({loading:true,TotalResultados:{
        total_armas:0,
        total_detenidos:0,
        total_municiones:0,
        total_sustancias_ilegales:0,
        total_vehiculos:0
    },error:false})
    let date_ = `${new Date().getMonth() + 1},01,${new Date().getFullYear()}`
    let end_date_ = `${new Date().getMonth() + 2},01,${new Date().getFullYear()}`
    const [RangeDate, setRangeDate] = useState<[Date | null, Date | null]>([new Date(date_),new Date(end_date_)])
    const [StarDate,EndDate] = RangeDate
    
    const fetchDataApi = async () => {
        try {
            const data = await getApoyoTecnico()
            setData(data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    const ExampleCustomInput = forwardRef<HTMLButtonElement,{value:any,onClick:MouseEventHandler}>(({value,onClick}, ref) => (
        <button className="ml-2 px-4 py-1 bg-white font-semibold " onClick={onClick} ref={ref}>
            {value}
        </button>
    ))
   

    const fetchData = useCallback(
        () => {
        fetchDataApi();
        },
        [Search]
    );

    useEffect(() => {
        // Execute function async
        if(DataTotalResultados.TotalResultados.total_detenidos == 0){
            (async()=>{
                try {
                    const data = await getApoyoTecnicoResultsTotal()
                    setDataTotalResultados({TotalResultados:data?.data!,loading:false,error:false})
                } catch (error) {
                    console.log(error)
                    setDataTotalResultados({loading:false,TotalResultados:{
                        ...DataTotalResultados.TotalResultados
                    },error:true})
                }
            })()
        }
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

    const GetDataByRangeDate = async (start_date:Date | null,end_date:Date | null) => {
        try {
            const data = await getApoyoTecnicoResultsTotalByParamas(start_date,end_date)
            setDataTotalResultados({TotalResultados:data?.data!,loading:false,error:false})
        } catch (error) {
            console.log(error)
            setDataTotalResultados({loading:false,TotalResultados:{
                ...DataTotalResultados.TotalResultados
            },error:true})
        }
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
                        {/* TODO: Numero Plantilla */}
                        <div className="absolute top-[150px] left-14 ">
                            <p className='text-[#002060] text-lg font-semibold  text-center'>UNCI {DataModal?.numero_reporte}</p>
                        </div>
                        
                        {/* TODO: UNIDAD EJECUTORA */}
                        <div className="absolute top-[212px] left-9">
                            <span className='text-[#002060] text-xl font-bold '>{DataModal?.ejecutor}</span>
                        </div>
                        {/* TODO: UNIDAD FECHA */}
                        <div className="absolute top-[185px] left-60">
                            <span className='text-[#002060] text-base font-semibold '>{format(new Date(DataModal.fecha),'dd/MM/yyyy')}</span>
                        </div>
                        {/* TODO: UBICACION */}
                        <div className="absolute top-[316px] left-9 w-[325px]">
                            <p className='text-[#002060] text-lg leading-5'>{DataModal?.direccion}</p>
                        </div>
                        {/* TODO: LATITUD */}
                        <div className="absolute top-[360px] left-9 w-[325px]">
                            <span className='text-[#002060] text-lg -leading-3'> {DataModal?.latitud} {DataModal.longitud} </span>
                        </div>
                        {/* TODO: CORDINACION */}
                        <div className="absolute top-[414px] left-9 w-[325px]">
                            <span className='text-[#002060] text-lg  block'> - UNCI</span>
                            <span className='text-[#002060] text-lg '>{DataModal?.unidades_apoyo}</span>
                        </div>
                        {/* TODO: DELITO - CONTRAVENCION */}
                        <div className="absolute top-[578px] left-9 w-[325px]">
                            <p className='text-[#002060] text-lg  block '> {DataModal?.delito}</p>
                        </div>
                        {/* TODO: Tipo Operatvivo  */}
                        <div className="absolute top-[100px] left-[383px] w-[454px]">
                            <p className='text-[#002060] text-lg font-semibold leading-5 uppercase'>{DataModal?.tipo_operativo}</p>
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
                            {formatData(DataModal?.indicios)}
                            {formDataArray(DataModal?.indicios.SustanciasIlegales)}
                        </div>
                        <div className="absolute top-[430px] left-[366px] w-[909px] h-[285px] bg-cover bg-center bg-no-repeat " style={{backgroundImage:`url('${URI_IMG}/${DataModal?.name_image}')`}}></div>

                    </div>
                </div>
            </Modal>
            <h2 className='text-3xl font-semibold mb-2'>Reporte Mensuales</h2>
            <span className='text-base font-semibold mb-2 inline-block'>Fecha</span>
            <DatePicker dateFormat="d MMM yyyy" selectsRange={true} startDate={StarDate} endDate={EndDate} onChange={(update) => setRangeDate(update) } customInput={<ExampleCustomInput value={''} onClick={() => {}}  />} />
            <button className='md:ml-2 text-white font-semibold bg-blue-500 px-4 py-1 rounded-md hover:bg-blue-600 mb-2' onClick={() => GetDataByRangeDate(StarDate,EndDate)}>Ver Resultados</button>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 gap-x-4">
                {[{title:'Total Detenidos',numero:DataTotalResultados.TotalResultados.total_detenidos ,icon:User},{title:'Total Armas',numero:DataTotalResultados.TotalResultados.total_armas,icon:Armas},{title:'Total Sustancias Sujetas F...',numero:parseFloat(DataTotalResultados.TotalResultados.total_sustancias_ilegales.toFixed(3)),otro:'kg',icon:SustanciasIlegales},{title:'Total Vehiculos',numero:DataTotalResultados.TotalResultados.total_vehiculos,icon:Vehiculo},{title:'Total Dinero',numero:200,icon:Dinero,otro:'Dolares Americanos'},{title:'Total Municiones',numero:DataTotalResultados.TotalResultados.total_municiones,icon:Municiones}].map((item) => (
                    <CardsCantidad otro={item.otro}  Icon={item.icon!} title_card={item.title} numero={item.numero} />
                ))}
            </div>
            
            <Table openModal={openModal} data={Data}  loading={false} />
        </>
    )
}