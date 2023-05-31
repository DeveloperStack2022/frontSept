import {ValidationType} from '@/schemas/form'
const URI = 'http://192.168.20.208:5050/api'
import axios from 'axios'
// /solicitud_test?skip=1&limit=10
export const addSolicitud = async (dataParams:ValidationType,token:any,ubicacion:any,celulares:any) => {
    const date = new Date()
    const dateH = date.toLocaleTimeString('en-us');

    // Fecha 
    const fecha = date.toLocaleDateString()

    const dataSerializada = {
        "hora":dateH ,
        "fecha": fecha,
        "plataforma": "Septier",
        "caso": dataParams.nombre_caso,
        "delito":dataParams.delito,
        "evento": '',
        "organizacion_delicuencial": dataParams.grupo_delicuencial,
        'investigacion_previa':dataParams.investigacion_previa,
        "solicitante": {
            "grado": dataParams.grado,
            "nombres_completos": dataParams.nombres_apellidos,
            "unidad": dataParams.unidad,
            "zona": dataParams.zona
        },
        "celular": celulares,
        "ubicacion": ubicacion
    }
    try {
        const response = await axios.post(`${URI}/solicitud`,dataSerializada,{
            headers:{
                "accept":"*/*",
                'Content-Type':'application/json',
                'x-access-token':token
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

export const getPaginateSolicitudes = async (skip:number,limit:number,token:string) => {
    try{
        const response = await axios.get(`${URI}/solicitud_test?skip=${skip}&limit=${limit}`,{
            headers:{
                "accept":"*/*",
                'Content-Type':'application/json',
                'x-access-token':token
            }
        })
        return {
            data: response.data?.solicitud,
            status: response.status,
            n_documents: response.data?.n_documents
        }
    }catch(error){
        console.log(error)
    }
}

export const getOneSolicitud = async (id:string,token:string) => {
    const response = await axios.get(`${URI}/solicitud/${id}/results`,{
        headers:{
            'x-access-token': token
        }
    })
    return {
        data: response.data,
        status: response.status
    }
}