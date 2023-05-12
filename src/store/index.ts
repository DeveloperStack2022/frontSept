import {configureStore} from '@reduxjs/toolkit'
// Slices 
import getSolicitudSlice from './features/get_one_information'
export const store = configureStore({
    reducer: {
        solicitud: getSolicitudSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch