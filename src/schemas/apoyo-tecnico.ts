import * as yup  from 'yup'
export type Detenidos = {
    tipo_identificacion:string;
    n_identificacion:string;
    ciudadania:string;
    nombre_completos:string;
}


export type ValidationType = {
    // Default Types
    hora:string
    fecha:string;

    // TODO: Datos Generales 
    numero_caso:string;
    zona:string;
    sub_zona:string;
    distrito:string;
    direccion:string;
    
    // Cordenadas 
    latitud:string;
    longitud:string;
    unidad_ejecutora:string;
    unidades_apoyo:string
    
    // TODO: Resumen Caso
    asunto:string;
    causa_aprehesion:string;
    tipo_delito:string;
    gdo_pertenciente:string;

    // TODO: Detenicos 
    detenidos:[{
        tipo_identificacion:string;
        n_identificacion:string;
        ciudadania:string;
        nombre_completos:string;
        sexo:string;
    }]

    // TODO: Sustancias Sujetas A Fiscalizacion
    sustancias_sujetas_fiscalizacion: [{
        tipo_droga:string;
        peso_neto:string;
        descripcion_logotipo:string
        descripcion_marquilla:string;
    }]

    // TODO: Armas 
    tipo_arma:string; // Fuego - Blanca
    armas:[{
        tipo_fabricacion:string;
        cantidad:string;
        calibre:string;
    }]

    // TODO: Municiones
    municiones:[{
        tipo_municion:string;
        cantidad:string;
        calibre:string;
    }] 

    // TODO: Dinero 
    dinero:[{
        tipo_divisa:string
        valor_total:string;
    }]
    // TODO: Vehiculos
    vehiculo:[{
        tipo_vehiculo: string;
        marca:string;
        modelo:string;
        placa:string;
    }]
}


const validationSchema = yup.object().shape({
    // TODO: Datos Generales
    numero_caso:yup.string(),
    zona:yup.string(),
    sub_zona:yup.string(),
    direccion:yup.string(),
    distrito:yup.string(),
    
    latitud:yup.string().matches(/^(?:(?:-?([0-1]?[0-9]|[2][0-1])(\.{1}[0-9]{1,6})))?$/,"Latitud no permitida").notRequired(),
    longitud:yup.string().matches( /^(?:(?:-0*[7-9]\d|-[8-9]\d\d|-[1-7]\d\d\d)|(?:0*\d\d\d|0*1[0-7]\d\d|0*1800?))(?:\.\d+)?$|^$/,"Longitud no permitida").notRequired(),
    unidad_ejecutora:yup.string(),
    unidades_apoyo:yup.string(),

    // TODO: Resumen Caso
    asunto:yup.string(),
    causa_aprehesion:yup.string(),
    tipo_delito:yup.string(),
    gdo_pertenciente:yup.string(),
    
    // TODO: Detenidos 
    detenidos:yup.array().of(
        yup.object().shape({
            tipo_identificacion:yup.string(),
            n_identificacion:yup.string(),
            ciudadania:yup.string(),
            nombre_completos:yup.string()
        })
    ),
    // TODO: Armas 
    tipo_arma:yup.string(), // Fuego - Blanca
    armas: yup.array().of(
        yup.object().shape({
            tipo_fabricacion:yup.string(),
            cantidad:yup.string(),
            calibre: yup.string(),
        })
    ),
    // TODO: Munciciones
    municiones: yup.array().of(
        yup.object().shape({
            tipo_municion:yup.string(),
            cantidad:yup.string(),
            calibre:yup.string()
        })
    ),
    // TODO:
    dinero: yup.array().of(
        yup.object().shape({
            tipo_divisa:yup.string(),
            valor_total:yup.string()
        })
    )
})

export default validationSchema