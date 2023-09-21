import {createSlice,PayloadAction} from '@reduxjs/toolkit'


export const storeApoyoTecnico = createSlice({
    name:'Apoyo-Tecnico',
    initialState:{
        error:false
    },
    reducers:{
        updateDatosGenerales: (state,action:PayloadAction<{
            fecha:Date,
            numero_caso:string;
            zona:string;
            sub_zona:string;
            direccion:string;
            latitud:string;
            longitud:string;
            unidad_ejecutora:string;
            unidad_apoyo:string;
            distrito:string
            numero_reporte:number
        }>) => {
            const {numero_caso,direccion,sub_zona,zona,latitud,longitud,unidad_apoyo,unidad_ejecutora,distrito,fecha,numero_reporte} = action.payload
            state.fecha = fecha
            state.numero_caso = numero_caso
            state.zona = zona
            state.sub_zona = sub_zona
            state.direccion = direccion
            state.cordenadas = latitud
            state.longitud = longitud
            state.unidad_apoyo = unidad_apoyo
            state.unidad_ejecutora = unidad_ejecutora
            state.distrito = distrito
            state.numero_reporte = numero_reporte
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
        },
        save_data: (state,action: PayloadAction<any>) => {
            state.data = { ...action.payload}
        },
        error_forms: (state,actions: PayloadAction<any>) => {
            state.error = true;
            state.message_error = actions.payload.message;
        }
    }
})

export const {updateDatosGenerales,updateResumenCaso,updateDetenidos,save_data,error_forms} = storeApoyoTecnico.actions
export default storeApoyoTecnico.reducer