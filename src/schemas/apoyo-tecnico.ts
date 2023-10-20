import * as yup  from 'yup'

export type TotalResultados = {
    total_municiones:number,
    total_sustancias_ilegales:number,
    total_detenidos:number,
    total_armas:number,
    total_vehiculos:number
    total_dinero:number
    total_terminales_moviles:number
}

export type SingleDataPresentation = {
    nombre_caso:string;
    ejecutor:string;
    unidades_apoyo:string;
    numero_reporte:string;
    direccion:string;
    latitud:string;
    longitud:string;
    delito:string;
    contexto:string; //TODO: Resumen Caso
    detenidos:number
    name_image:string;
    tipo_operativo:string;
    fecha:Date;
    indicios: {
        armas:number;
        celulares:number
        SustanciasIlegales:{
            medida_peso:string
            peso_neto:string;
            tipo_droga:string;
        }[]
    }
}

export type Detenidos = {
    tipo_identificacion:string;
    n_identificacion:string;
    ciudadania:string;
    nombre_completos:string;
}


export type ValidationType = {
    // Default Types
    hora:string
    fecha:Date;

    // TODO: Datos Generales 
    tipo_operativo:string;
    numero_caso:string;
    zona:string;
    sub_zona:string;
    distrito:string;
    direccion:string;
    numero_reporte:number;
    unidad_apoyo:string
    
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

    // TODO: Celulares
    celulares: [{
        marca:string;
        modelo:string;
        numero:string;
    }]

    // TODO: Sustancias Sujetas A Fiscalizacion
    sustancias_sujetas_fiscalizacion: [{
        tipo_droga:string;
        peso_neto:string;
        medida_peso:'kg'| 'gr'
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

    upload_anexo:File
}




const validationSchema = yup.object().shape({
    // TODO: Datos Generales
    fecha:yup.date(),
    numero_caso:yup.string(),
    zona:yup.string(),
    sub_zona:yup.string(),
    direccion:yup.string(),
    distrito:yup.string(),
    tipo_operativo:yup.string(),
    
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