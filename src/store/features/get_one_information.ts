import {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit'
// Services 
import {getOneSolicitud} from '@/services/solicitud-services'

import {SolicitudAction} from '@/schemas/solicitud-schema'

export interface GetState {
    // Data Solicitante
    grado:string;
    nombres_completos:string;
    unidad:string;
    zona:string;
    // Data Solicitud
    fecha:Date;
    hora: string;
    evento:string;
    caso:string;
    delito:string
    gdo:string;
    // Data Celular
    celulares: {
        numero:string;
        imsi:string;
    }[]
    // D. Ubicacion
    ubicacion:{
        longitud:string;
        latitud:string
    }[]
}


interface InitialState extends SolicitudAction {
    status:string
}

// Async Tunks
export const fetchData = createAsyncThunk('getsolicitud',async ({id,token}:{id:string,token:string})=>{
    // Services getSolicitudes 
    try {
        const data = await getOneSolicitud(id,token)
        return data
    } catch (error) {
        throw error
    }
    
})



const initalState:InitialState  = {
    status:'initial',
    caso:'',
    fecha:new Date(),
    celulares_solicitados:[],
    delito:'',
    evento:'',
    hora:'',
    organizacion_delicuencial:'',
    plataforma:'',
    solicitante_result:[],
    ubicaciones_celulares:[]

}

export const informationSolicitud = createSlice({
    name:'solicitud',
    initialState:initalState,
    reducers:{
        solicitudSelect: (state,action:PayloadAction<GetState>) => {
            console.log(action)
        }
    },
    extraReducers(builder){
        builder
            .addCase(fetchData.pending, (state,action) => {
                state.status = 'loading'
            })
            .addCase(fetchData.fulfilled, (state,action:PayloadAction<{data:SolicitudAction}>) => {
                const {celulares_solicitados,delito,evento,fecha,hora,organizacion_delicuencial,plataforma,solicitante_result,ubicaciones_celulares,caso} = action.payload.data
                
                const data_celulares = celulares_solicitados.map((e,i) => {
                    return {
                        numero_celular: e.numero_celular,
                        imsi: e.imsi
                    }
                })

                const ubicicaciones_celulares = ubicaciones_celulares.map((e,i) => {
                    return {
                        latitud: e.latitud,
                        longitud: e.longitud
                    }
                })

                // console.log(action.payload.data.hora)
                state.caso = caso
                state.status = 'succeeded'
                state.delito = delito
                state.evento = evento
                state.fecha = fecha 
                state.hora = hora
                state.organizacion_delicuencial = organizacion_delicuencial
                state.plataforma = plataforma
                state.solicitante_result = solicitante_result
                state.celulares_solicitados = data_celulares
                state.ubicaciones_celulares = ubicicaciones_celulares
            })
            .addCase(fetchData.rejected,(state,action) => {
                state.status = 'fialed'
            })
    }
})

export const {solicitudSelect} = informationSolicitud.actions
export default informationSolicitud.reducer