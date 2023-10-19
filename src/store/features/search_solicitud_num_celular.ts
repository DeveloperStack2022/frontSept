import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export type SolicitudNumero = {
    Solicitud:SolicitudM;
    Analista:SolicitanteM
 }
 
 type SolicitudM = {
    caso:string;
    delito:string;
    organizacion:string;
    investigacion_previa:string;
    nombre_fiscalia:string;
    nombre_fiscal:string;
 }
 
 type SolicitanteM = {
    grado:string;
    nombre_completos:string;
    unidad:string;
    zona:string;
 }
 

interface initalState extends SolicitudNumero {
    status:boolean
}

const initialState:initalState = {
    status:false,
    Analista: {
        grado:'',
        nombre_completos:'',
        unidad:'',
        zona:''
    },
    Solicitud:{
        caso:'',
        delito:'',
        investigacion_previa:'',
        organizacion:'',
        nombre_fiscal:'',
        nombre_fiscalia:''
    }
}

export const solicitudByNumCelular = createSlice({
    name:'solicitudByNumCelular',
    initialState:initialState,
    reducers: {
        informationSolicitud: (state,{payload}:PayloadAction<SolicitudNumero>) => {
            
            state.status = true
            state.Analista.grado  = payload.Analista.grado
            state.Analista.nombre_completos =  payload.Analista.nombre_completos
            state.Analista.unidad = payload.Analista.unidad
            state.Analista.zona = payload.Analista.zona
            
            state.Solicitud.caso = payload.Solicitud.caso
            state.Solicitud.delito = payload.Solicitud.delito
            state.Solicitud.investigacion_previa = payload.Solicitud.investigacion_previa
            state.Solicitud.organizacion = payload.Solicitud.organizacion
            state.Solicitud.nombre_fiscal = payload.Solicitud.nombre_fiscal,
            state.Solicitud.nombre_fiscalia = payload.Solicitud.nombre_fiscalia
           
        },
        removeInformationSolicitud:(state) => {
            state.status = false
        }
    }
})

export const {informationSolicitud,removeInformationSolicitud} = solicitudByNumCelular.actions;
export default solicitudByNumCelular.reducer