import {useState,useCallback} from 'react'
import TableComponent from './components/table';

//Services 
import {getPaginateSolicitudes} from '@/services/solicitud-services'

// TODO: Custom hooks 
import {useLocalStorage} from '@/hooks/useLocalStorage'

const ViewSolicitudes = () => {

    // TODO: Custom Hooks 
    const {getItem} = useLocalStorage()

    const [Loading, setLoading] = useState<boolean>(false)
    const [Search, setSearch] = useState("")
    const [Data, setData] = useState([])
    const [PageCount, setPageCount] = useState<number>(0)

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
    
    return (
        <>
            <TableComponent data={Data} loading={Loading} pageCount={PageCount} fetch_data={fetchData}  />
        </>
    )
}

export default ViewSolicitudes;