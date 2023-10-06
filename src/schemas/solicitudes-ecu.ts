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

    // DATOS DELICUENTE
    numero_celular_solicitado:string;
    alias:string;
    nombre_gdo_perteneciente:string;
    
    // Investigacion
    nombre_caso:string;
    delito:string;

}


const validation = yup.object().shape({
    
})
