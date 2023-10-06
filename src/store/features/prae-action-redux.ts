import {createAsyncThunk,createSlice, PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios'
import {ValidationFormPrae} from '@/schemas/solicitudes-prae'
const URI = import.meta.env.VITE_API_URL


// REDUX: User State 
interface UserState {
    data:ValidationFormPrae,
    loading: 'idle' | 'pending' | 'succeded' | 'failed'
}

// REDUX: Initial State 
const initialState = {
    data:{
        agente_req:'',
        cedula:'',
        celular:'',
        direccion:'',
        empresa:'',
        gdo:'',
        motivo:'',
        nombres_apellidos:'',
        numero_cl:'',
        placas:'',
        telefono:'',
        unidad_req:''
    },
    loading: 'idle'
}  as UserState

// REDUX: Create Async Tunk 
const fetchContent = createAsyncThunk(
    'cretate/registroPrae',
    async (data:ValidationFormPrae) => {
        const res = await axios(`${URI}/registroPrae`,{
            data,
            method:'POST',
            headers:{
                'Content-Type':'Application/json',
            }
        })
        const data_response = await res.data
        return data_response
    }
    )
// REDUX: Create Slice Redux
const praeSlice = createSlice({
    name:'Prae-Slice',
    initialState,
    reducers:{
        addData:(state,action:PayloadAction<ValidationFormPrae>) => {
            state.data = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchContent.pending,(state) => {
            state.loading = 'pending'
        })
        builder.addCase(fetchContent.fulfilled,(state) => {
            state.loading = 'succeded'
        })
        builder.addCase(fetchContent.rejected,(state) => {
            state.loading = 'failed'
        })
    }
})

const {addData} = praeSlice.actions

// REDUX: Export Reducers & AsyncTunk
export default praeSlice.reducer
export {
    fetchContent,
    addData
}