import {ValidationType} from '@/schemas/form'
import axios,{AxiosResponse} from 'axios'

const URI = import.meta.env.VITE_API_URL


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

export const searchSolicitudByNumero = async (num_celular:string,token:string) => {
    return await axios.get(`${URI}/solicitud/${num_celular}`,{
        headers:{
            'x-access-token':token
        }
    })
    
}


/**
 * @function searchSolicitudByCaso
 * @param caso -> string 
 * @param token  -> string 
 * @returns {
 *  solictudes: Array[],
*  n_documents: number
* }
 */

export const searchSolicitudByCaso = async (caso:string,token:string):Promise<AxiosResponse> => {
    return await axios.get(`${URI}/solicitud_caso/${caso}`,{
        headers:{
            'x-access-token':token
        }
    })
}

export const searchSolicitudByIp = async (ip:string,token:string) => {
    return await axios.get(`${URI}/solicitud_ip/${ip}`,{
        headers:{
            'x-access-token':token
        }
    })
}

export const searchSolicitudByNumCelular = async (num_celular:string,token:string) => {
    return await axios.get(`${URI}/solicitud_numero_celular/${num_celular}`,{
        headers:{
            'x-access-token':token
        }
    })
}

export const searchSolicitudByZona = async (zona:string,token:string) => {
    
    return await axios.get(`${URI}/solicitud_zona/${zona}`,{
        headers:{
            'x-access-token':token
        }
    })
}