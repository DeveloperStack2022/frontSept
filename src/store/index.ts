import {configureStore} from '@reduxjs/toolkit'
// Slices 
import getSolicitudSlice from './features/get_one_information'
import  searchSolicitudByNumCelular from './features/search_solicitud_num_celular'

export const store = configureStore({
    reducer: {
        solicitudSearch: searchSolicitudByNumCelular,
        solicitud: getSolicitudSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch