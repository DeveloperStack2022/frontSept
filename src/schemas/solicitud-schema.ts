type UbicacionesSchema = {
    longitud:string;
    latitud:string
}

type CelularesSchema = {
    imsi:string;
    numero_celular:string;
}

type Solicitante = {
    grado:string
    nombres_completos:string;
    unidad:string;
}

export type SolicitudAction = {
    delito: string;
    evento:string;
    caso:string;
    fecha:Date;
    hora:string;
    organizacion_delicuencial:string;
    plataforma:string;
    ubicaciones_celulares:UbicacionesSchema[]
    celulares_solicitados:CelularesSchema[]
    solicitante_result:Solicitante[]
}