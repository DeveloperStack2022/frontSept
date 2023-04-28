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
    nombre_caso:string;
    evento:string;
    delito:string;
    grupo_delicuencial:string;
    investigacion_previa:string;

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
    evento:yup.string(),
    delito:yup.string().required('Campo requerido'),
    grupo_delicuencial:yup.string(),
    investigacion_previa:yup.string().required('Campo requerido'),
    // Datos Solicitante
    grado:yup.string().required('Campo requerido'),
    nombres_apellidos:yup.string().required('Campo requerido'),
    unidad:yup.string().required('Campo requerido'),
    zona:yup.string(),
    // Datos Celular
    celulares: yup.array().of(
        yup.object().shape({
            numero_celular:yup.string().required('Campo requerido'),
            imsi:yup.string(),
            latitud:yup.string().matches(/^-?([0-1]?[0-9]|[2][0-1])(\.{1}[0-9]{1,6})?$/,"Latitud no permitida"),
            longitud:yup.string().matches( /^-?(?:1[1-8]|[1-9])?\d(?:\.\d{1,20})?$/,"Longitud no permitida"),
        })
    )
})

export default validationSchema