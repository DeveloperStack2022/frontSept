import {useState,useCallback,useEffect} from 'react'
import TableComponent from './components/table';
// TODO: Schemas 
import {SolicitudAction} from '@/schemas/solicitud-schema'
// Custom components
import Modal from './components/modal'

//Services 
import {getPaginateSolicitudes} from '@/services/solicitud-services'

// Slices 
import {fetchData as fetchGetSolicitudById} from '@/store/features/get_one_information'

// TODO: Custom hooks 
import {useLocalStorage} from '@/hooks/useLocalStorage'
import {useAppDispatch,useAppSelector} from '@/hooks/redux'

// TODO: 
interface SolicitudAddStatus extends SolicitudAction {
    status:string
}

const ViewSolicitudes = () => {

    // Hooks Redux 
    const dispatch = useAppDispatch()
    const solicitudSelector = useAppSelector(state => state.solicitud)

    // TODO: Custom Hooks 
    const {getItem} = useLocalStorage()

    const [Loading, setLoading] = useState<boolean>(false)
    const [Search, setSearch] = useState("")
    const [Data, setData] = useState([])
    const [PageCount, setPageCount] = useState<number>(0)
    const [OpenModal, setOpenModal] = useState<boolean>(false)
    const [DataSolicitud, setDataSolicitud] = useState<SolicitudAddStatus>({
        status:'initial',
        fecha:new Date(),
        celulares_solicitados:[],
        delito:'',
        evento:'',
        hora:'',
        organizacion_delicuencial:'',
        plataforma:'',
        solicitante_result:[],
        ubicaciones_celulares:[]
    })
    

    // Hooks Effects 
    useEffect(() => {
        setDataSolicitud(solicitudSelector)
    },[solicitudSelector])
    
    const fetchDataApi = async (skip:number) => {
        const token_ = JSON.parse(getItem('authToken'))
        try {
            const data = await getPaginateSolicitudes(skip,token_?.accessToken)
            setData(data?.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchData = useCallback((n_page:number) => {
        fetchDataApi(n_page)
    },[Search])
    
    const showOneDataSolicitud = (id:string) => {
        console.log(id)
    }
    
    const handleModal = () => {
        setOpenModal(prev => !prev)
    }


    const handleGetSolicitudById = (id:string) => {
        const token = getItem('authToken')
        const token_ = JSON.parse(token)
        dispatch(fetchGetSolicitudById({id,token:token_?.accessToken}))
        handleModal()
    }

    return (
        <>
            <Modal data={DataSolicitud} isOpen={OpenModal} onClose={handleModal} status={solicitudSelector.status} />     
            <TableComponent handleGetSolicitud={handleGetSolicitudById} handleModal={handleModal} showOneDataSolicitud={showOneDataSolicitud} data={Data} loading={Loading} pageCount={PageCount} fetch_data={fetchData}  />
        </>
    )
}

export default ViewSolicitudes;