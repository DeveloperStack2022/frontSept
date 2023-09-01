import axios,{AxiosResponse} from 'axios'
import {ValidationType} from '@/schemas/apoyo-tecnico'
const URI = import.meta.env.VITE_API_URL


export const addApoyoTecnico = async (data: ValidationType) => {
    const formatData = {
        ...data,
        DatosGenerales: {
            nombre_caso: data.numero_caso,
            zona:data.zona,
            subzona:data.sub_zona,
            distrito: data.distrito,
            direccion:data.direccion,
            fecha: new Date(data.fecha),
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

    try {
        const response = await axios.post(`${URI}/registroApoyoTecnico`,formatData,{
            headers:{
                'Accept':'*/*',
                'Content-Type':'application/json',
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


export const getApoyoTecnico = async () => {
    try {
        const response = await axios.get(`${URI}/getApoyoTecnico`)
        
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