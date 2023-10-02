import axios,{AxiosResponse} from 'axios'
import {ValidationType,TotalResultados} from '@/schemas/apoyo-tecnico'
const URI = import.meta.env.VITE_API_URL


export const addApoyoTecnico = async (data: ValidationType) => {
    const formatData = {
        ...data,
        DatosGenerales: {
            tipo_operativo: data.tipo_operativo,
            nombre_caso: data.numero_caso,
            zona:data.zona,
            subzona:data.sub_zona,
            distrito: data.distrito,
            direccion:data.direccion,
            fecha: new Date(data.fecha),
            numero_reporte:data.numero_reporte,
            unidades_apoyo:data.unidades_apoyo,
            coordenadas:{
                latitud:data.latitud,
                longitud:data.longitud
            },
            unidad_ejecutoria:data.unidad_ejecutora,
        },
        ResumenCaso:{
            asunto:data.asunto,
            causa_aprehesion:data.causa_aprehesion,
            tipo_de_delito:data.tipo_delito,
            dgo: data.gdo_pertenciente
        }
    }

    const formData = new FormData()
    formData.append('upload_anexo',data.upload_anexo)
    formData.append('data',JSON.stringify(formatData))
    try {
        const response = await axios.post(`${URI}/registroApoyoTecnico`,formData,{
            headers:{
                'Accept':'*/*',
                'Content-Type': 'multipart/form-data'
            }
        })

        return {
            status: response.status,
            data: response.data
        }
        
    } catch (error) {
        console.log(error)
    }
}


export const getApoyoTecnico = async (skip:number,limit:number) => {
    try {
        const response = await axios.get(`${URI}/getApoyoTecnico?skip=${skip}&limit=${limit}`)
        
        return {
            status: response.status,
            data: response.data
        }
    } catch (error) {
        console.log(error)
    }
}
export const   getApoyoTecnicoById = async (id:string) => {
    try {
        const response =  await axios.get(`${URI}/getApoyoTecnicoId/${id}`)
        return response
    } catch (error) {
        
    }
}
export const getApoyoTecnicoResultsTotal = async () => {
    try {
        const response = await axios.get<TotalResultados>(`${URI}/getResultByRangeDate?date_start=2023-09-01&date_end=2023-09-31`)
        return {
            status: response.status,
            data: response.data,
        }
    } catch (error) {
        console.log(error)
    }
}
export const getApoyoTecnicoResultsTotalByParamas = async (start_date:Date | null,end_date:Date | null) => {
    try {
        const response = await axios.get<TotalResultados>(`${URI}/getResultByRangeDate?date_start=${start_date}&date_end=${end_date}`)
        return {
            status: response.status,
            data: response.data,
        }
    } catch (error) {
        console.log(error)
    }
}
