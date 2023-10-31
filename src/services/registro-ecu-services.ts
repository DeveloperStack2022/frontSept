import axios from 'axios'
const URI =  import.meta.env.VITE_API_URL
import {SolicitudesEcu} from '@/schemas/solicitudes-ecu'

export const addRegistroEcu = async (data:SolicitudesEcu) => {
    console.log(data)
    const data_ = {
        Agente:{
            unidad_requiriente:data.unidad,
            grado_nombres_agente: data.grado_nombres_agente,
            numero_cedula_agente: data.numero_cedula_agente,
            numero_celular_agente:data.numero_celular_agente
        },
        Solicitud:{
            nombre_caso:data.nombre_caso,
            delito:data.delito,
            alias: data.alias,
            nombre_gdo_perteneciente: data.nombre_gdo_perteneciente
        },
        Terminal:{
            operadora: '',
            numero_celular:'',
            identificacion_ruc:'',
            propietario:'',
            localizacion:'',
        }, 
        RadioBase:{
            provincia_rb:'',
            ciudad_rb:'',
            nombre_rb:'',
            celda:'',
            azimut:'',
            tipo_ubicacion:'',
            desidad:'',
            direccion_rb:'',
            latitud_rb:'',
            longitud_rb:''
        }
    }
    try {
        const response  = await axios.post(`${URI}/registroEcu`, data_,{
            headers:{
                'Accept':'*/*',
                'Content-Type':'application/json'
            }
        })
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
}