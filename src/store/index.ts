import {configureStore} from '@reduxjs/toolkit'
// Slices 
import getSolicitudSlice from './features/get_one_information'
import  searchSolicitudByNumCelular from './features/search_solicitud_num_celular'
import ApoyoTecnico from './features/apoyo-tecnico'
import praeRegistro from './features/prae-action-redux'


export const store = configureStore({
    reducer: {
        solicitudSearch: searchSolicitudByNumCelular,
        solicitud: getSolicitudSlice,
        apoyoTecnico: ApoyoTecnico,
        praeRegistro:praeRegistro
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch