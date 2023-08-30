import {useState,useCallback,useEffect} from 'react'
import Table from './components/table'
import {getApoyoTecnico} from '@/services/apoyo-tecnico-services'

export default function ApoyoTecnico(){

    // FIXME: STATE OF TABLES
    const [Search,setSearch] = useState('')
    const [Data, setData] = useState([])
    
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
    return (
        <>
            <h2>List Apoyo Tecnico</h2>
            <Table data={Data}  loading={false} />
        </>
    )
}