import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import produce from 'immer'

export type SolicitudNumero = {
    numero_celular:string;
    solicitud:SolicitudM;
    solicitante:SolicitanteM
 }
 
 type SolicitudM = {
    caso:string;
    delito:string;
    organizacion_delicuencial:string;
    investigacion_previa:string;
 }
 
 type SolicitanteM = {
    grado:string;
    nombres_completos:string;
    unidad:string;
    zona:string;
 }
 

interface initalState extends SolicitudNumero {
    status:boolean
}

const initialState:initalState = {
    status:false,
    numero_celular: '',
    solicitante: {
        grado:'',
        nombres_completos:'',
        unidad:'',
        zona:''
    },
    solicitud:{
        caso:'',
        delito:'',
        investigacion_previa:'',
        organizacion_delicuencial:''
    }
}

export const solicitudByNumCelular = createSlice({
    name:'solicitudByNumCelular',
    initialState:initialState,
    reducers: {
        informationSolicitud: (state,{payload}:PayloadAction<SolicitudNumero>) => {
            state.status = true
            state.numero_celular = payload.numero_celular
            
            state.solicitante.grado  = payload.solicitante.grado
            state.solicitante.nombres_completos =  payload.solicitante.nombres_completos
            state.solicitante.unidad = payload.solicitante.unidad
            state.solicitante.zona = payload.solicitante.zona
            
            state.solicitud.caso = payload.solicitud.caso
            state.solicitud.delito = payload.solicitud.delito
            state.solicitud.investigacion_previa = payload.solicitud.investigacion_previa
            state.solicitud.organizacion_delicuencial = payload.solicitud.organizacion_delicuencial
           
        }
    }
})

export const {informationSolicitud} = solicitudByNumCelular.actions;
export default solicitudByNumCelular.reducer