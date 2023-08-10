import * as yup  from 'yup'

export type FormInicioSessionType = {
    email:string;
    password:string;
}


export const validationSchemaInicioSession = yup.object().shape({
    email: yup.string().required('Introduzca el email').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Email incorrecto"),
    password: yup.string().required('Introduzca la contraseña')
})

export type ValidationType = {
    // Default Types
    hora:string
    plataforma:string;

    nombre_caso:string;
    delito:string;
    grupo_delicuencial:string;
    investigacion_previa:string;

    numero_cedula:string;
    grado:string;
    nombres_apellidos:string;
    unidad:string;
    zona:string;
    
    // Datos celular
    celulares:[{
        numero_celular:string;
        imsi:string;
        latitud:string;
        longitud:string;
    }]
}

export type ValidationTypeCelulares = {
    celulares: {
        numero_celular:string;
        imsi:string;
        latitud:string;
        longitud:string;
    }[]
}

const validationSchema = yup.object().shape({
    // Datos de solicitud
    nombre_caso:yup.string().required('Campo requerido'),
    delito:yup.string().required('Campo requerido'),
    grupo_delicuencial:yup.string(),
    investigacion_previa:yup.string().required('Campo requerido'),
    // Datos Solicitante
    grado:yup.string().required('Campo requerido'),
    nombres_apellidos:yup.string().required('Campo requerido'),
    unidad:yup.string().required('Campo requerido'),
    zona:yup.string().required('Campo requerido'),
    // Datos Celular
    celulares: yup.array().of(
        yup.object().shape({
            numero_celular:yup.string().required('Campo requerido'),
            imsi:yup.string(),
            // ^(\-?\d+(\.\d+)?),\s*(\-?\d+(\.\d+)?)$
            // latitud:yup.string().matches(/^(?:(?:-0*[7-7]\d|-[8-9]\d\d|-[1-7]\d\d\d)|(?:0*\d\d\d|0*1[0-7]\d\d|0*1800?))(?:\.\d+)?$|^$/,"Latitud no permitida").notRequired(),
            latitud:yup.string().matches(/^(?:(?:-?([0-1]?[0-9]|[2][0-1])(\.{1}[0-9]{1,6})))?$/,"Latitud no permitida").notRequired(),
            longitud:yup.string().matches( /^(?:(?:-0*[7-9]\d|-[8-9]\d\d|-[1-7]\d\d\d)|(?:0*\d\d\d|0*1[0-7]\d\d|0*1800?))(?:\.\d+)?$|^$/,"Longitud no permitida").notRequired(),
            // longitud:yup.string().matches(/^-?[0-9]{1,3}\.[0-9]{6}$/,"Longitud no permitida").notRequired(),
        })
    )
})

export default validationSchema