/**
    FICHA DE EMERGENCIA
    UNIDAD REQUIRENTE: UNCI
    Nro. de IDENTIDAD TELEFÓNICA A SOLICITAR:                                              

    0999999999

    ALIAS: PEPITO/ NINGUNO
    NOMBRE GDO: Los Lobos / en caso de no pertenecer se coloca NINGUNO
    NOMBRE DEL CASO: CUCHARA
    DELITO/CAUSA/INCIDENTE: ROBO

    GRADO Y NOMBRES ANALISTA SOLICITANTE: Tnte. Ariana Zambrano Montalvo
    CÉDULA: 120XXXXXX37
    TELÉFONO DEL SOLICITANTE: 09888888888
    FIN
 */
import * as yup from 'yup'

export type SolicitudesEcu = {
    // DATOS AGENTE INVESTIGADOR
    unidad:string;
    grado_nombres_agente:string;
    numero_celular_agente:string;
    numero_cedula_agente:string;

    // DATOS DELICUENTE
    celulares:[{
        numero_celular:string;
    }];
    alias:string;
    nombre_gdo_perteneciente:string;
    
    // Investigacion
    nombre_caso:string;
    delito:string;
}


const validation = yup.object().shape({

    // Datos Solicitud
    unidad:yup.string().required(),
    grado_nombres_agente:yup.string().required(),
    numero_celular_agente:yup.string().required(),
    numero_cedula:yup.string().required(),

    // Datos Solicitantes
    alias:yup.string().required(),
    nombre_gdo_perteneciente:yup.string().notRequired(),
    nombre_caso:yup.string().required(),
    delito:yup.string().required(),

    // Datos Celulares
    celulares: yup.array().of(
        yup.object().shape({
            numero_celular: yup.string().required('Campo Requerido')
        })
    )

})

export  default validation
