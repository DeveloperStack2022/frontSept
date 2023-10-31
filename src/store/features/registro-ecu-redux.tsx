import {createAsyncThunk,createSlice,PayloadAction} from '@reduxjs/toolkit'
import {SolicitudesEcu} from '@/schemas/solicitudes-ecu'
import {addRegistroEcu} from '@/services/registro-ecu-services'

// REDUX: User State 
interface UserState {
    data: SolicitudesEcu[]
    loading: 'idle' | 'pending' | 'succeded' | 'failed'
}
// REDUX: Initial State 
const initialState = {
    data:
    [{
        alias:'',
        celulares:[{}],
        delito:'',
        grado_nombres_agente:'',
        nombre_caso:'',
        nombre_gdo_perteneciente:'',
        numero_cedula_agente:'',
        numero_celular_agente:''
    }],
    loading:'idle'
} as UserState;

// REDUX: Create Async Tunk 
export const AddRegistroEcu = createAsyncThunk(
    'registroEcu/add',
    async (data:any) => {
        const data_ = await addRegistroEcu(data)
        return data_

    })
// REDUX: Create Slice 
const registroEcuSlice = createSlice({
    name:'ecu-slice',
    initialState,
    reducers:{
        addData: (state,action:PayloadAction<SolicitudesEcu>) => {
            state.data.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(AddRegistroEcu.pending, (state,action) => {
            state.loading = 'pending'
        })
        builder.addCase(AddRegistroEcu.fulfilled, (state,action) => {
            state.loading = 'succeded'
        })
        builder.addCase(AddRegistroEcu.rejected, (state,action) => {
            state.loading = 'failed'
        })
    }
})
// REDUX: Extrae Acitons
const {addData} = registroEcuSlice.actions

// REDUX: Export reducers and AsyncTunk
export default registroEcuSlice.reducer
export {
    addData
}