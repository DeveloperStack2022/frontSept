import {createAsyncThunk,createSlice,PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {SolicitudesEcu} from '@/schemas/solicitudes-ecu'

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
// REDUX: Create Slice 
const registroEcuSlice = createSlice({
    name:'ecu-slice',
    initialState,
    reducers:{
        addData: (state,action:PayloadAction<SolicitudesEcu>) => {
            state.data.push(action.payload)
        }
    },
})
// REDUX: Extrae Acitons
const {addData} = registroEcuSlice.actions

// REDUX: Export reducers and AsyncTunk
export default registroEcuSlice.reducer
export {
    addData
}