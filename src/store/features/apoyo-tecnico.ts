import {createSlice,PayloadAction} from '@reduxjs/toolkit'


export const storeApoyoTecnico = createSlice({
    name:'Apoyo-Tecnico',
    initialState:{},
    reducers:{
        updateDatosGenerales: (state,action:PayloadAction<{
            numero_caso:string;
            zona:string;
            sub_zona:string;
            direccion:string;
            latitud:string;
            longitud:string;
            unidad_ejecutora:string;
            unidad_apoyo:string;
            distrito:string
        }>) => {
            const {numero_caso,direccion,sub_zona,zona,latitud,longitud,unidad_apoyo,unidad_ejecutora,distrito} = action.payload

            state.numero_caso = numero_caso
            state.zona = zona
            state.sub_zona = sub_zona
            state.direccion = direccion
            state.cordenadas = latitud
            state.longitud = longitud
            state.unidad_apoyo = unidad_apoyo
            state.unidad_ejecutora = unidad_ejecutora
            state.distrito = distrito
        },
        updateResumenCaso: (state,action:PayloadAction<{
            asunto:string;
            causa_aprehesion:string;
            tipo_delito:string;
            gdo_perteneciente:string;
        }>) => {
            const {asunto,causa_aprehesion,gdo_perteneciente,tipo_delito} = action.payload
            state.asunto = asunto;
            state.causa_aprehesion = causa_aprehesion
            state.gdo_perteneciente = gdo_perteneciente
            state.tipo_delito = tipo_delito
        },
        updateDetenidos: (state,action:PayloadAction<{
            ciudadania:string;
            n_identificacion:string;
            nombre_completos:string;
            sexo:string;
        }>) => {
            const {ciudadania,n_identificacion,nombre_completos,sexo} = action.payload
            state.ciudadania = ciudadania
            state.n_identificacion = n_identificacion
            state.nombre_completos = nombre_completos
            state.sexo = sexo
        }
    }
})

export const {updateDatosGenerales,updateResumenCaso,updateDetenidos} = storeApoyoTecnico.actions
export default storeApoyoTecnico.reducer