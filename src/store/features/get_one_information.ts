import {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit'
// Services 
import {getOneSolicitud} from '@/services/solicitud-services'

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

// Async Tunks
export const fetchData = createAsyncThunk('/getsolicitud',async (id:string)=>{
    // Services getSolicitudes 
    try {
        const data = await getOneSolicitud(id)
        return data
    } catch (error) {
        throw error
    }
    
})

const initalState = {
    status: 'initial',
    solicitud:{
        
    }
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
        builder.addCase(fetchData.pending, (state,action) => {
            state.status = 'loading'
        })
        .addCase(fetchData.fulfilled, (state,action) => {
            state.status = 'succeeded'
        })
        .addCase(fetchData.rejected,(state,action) => {
            state.status = 'fialed'
        })
    }
})

export const {solicitudSelect} = informationSolicitud.actions
export default informationSolicitud.reducer