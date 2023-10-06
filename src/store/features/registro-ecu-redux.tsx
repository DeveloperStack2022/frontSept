import {createAsyncThunk,createSlice,PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {SolicitudesEcu} from '@/schemas/solicitudes-ecu'

// REDUX: User State 
interface UserState {
    data: SolicitudesEcu
    loading: 'idle' | 'pending' | 'succeded' | 'failed'
}
// REDUX: Initial State 
const initialState = {
    data:{
        unidad:'',
        numero_celular_agente:'',
        grado_nombres_agente:'',

        numero_celular_solicitado:'',
        alias:'',
        nombre_gdo_perteneciente:'',
        
        nombre_caso:'',
        delito:'',
    },
    loading:'idle'
} as UserState;

// REDUX: Create Async Tunk 
// REDUX: Create Slice 
const registroEcuSlice = createSlice({
    name:'ecu-slice',
    initialState,
    reducers:{
        addDate: (state,action:PayloadAction<SolicitudesEcu>) => {
            state.data = action.payload
        }
    },
})
// REDUX: Extrae Acitons
const {addDate} = registroEcuSlice.actions

// REDUX: Export reducers and AsyncTunk
export default registroEcuSlice.reducer
export {
    addDate
}