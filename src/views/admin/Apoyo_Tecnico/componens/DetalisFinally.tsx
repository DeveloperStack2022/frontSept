// TODO: Store Redux 
import { useAppDispatch, useAppSelector } from "@/hooks/redux";


export default function DetalisFinally(){
    const apoyo_tecnico = useAppSelector(state => state.apoyoTecnico)

    return (
        <>
            <div className="flex border border-green-500">
                <div className="px-4 w-1/2">
                    <span className="block"> <span className="font-semibold"> Numero Caso:</span>  {apoyo_tecnico?.data?.numero_caso} </span> 
                    <div className="flex justify-between">
                        <span className=""> <span className="font-semibold">Zona:</span>{apoyo_tecnico?.data?.zona} </span> 
                        <span><span className="font-semibold">Sub Zona:</span> {apoyo_tecnico?.data?.sub_zona} </span>
                    </div>
                    <div className="flex justify-between">
                        <span className=""> <span className="font-semibold">Distrito:</span>{apoyo_tecnico?.data?.distrito} </span> 
                        <span><span className="font-semibold">Direccion:</span> {apoyo_tecnico?.data?.direccion} </span>
                    </div>
                    <span className="block  font-semibold">Cordenadas</span>
                    <div className="flex justify-between">
                        <span className=""> <span className="font-semibold">Latitud:</span>{apoyo_tecnico?.data?.latitud} </span> 
                        <span><span className="font-semibold">Longitud:</span> {apoyo_tecnico?.data?.longitud} </span>
                    </div>
                    <div className="flex justify-between">
                        <span className=""> <span className="font-semibold">Unidad Ejecutora:</span>{apoyo_tecnico?.data?.unidad_ejecutora} </span> 
                        <span><span className="font-semibold">Unidades de apoyo:</span> {apoyo_tecnico?.data?.unidades_apoyo} </span>
                    </div>
                    <div className="flex justify-between">
                        <span className=""> <span className="font-semibold">Fecha:</span>{apoyo_tecnico?.data?.unidad_ejecutora} </span> 
                        <span><span className="font-semibold">Hora:</span> {apoyo_tecnico?.data?.unidades_apoyo} </span>
                    </div>
                </div>
                {/* Caso */}
                <div className="px-4 w-1/2">
                    <span className="block font-semibold">Asunto</span>
                    <p>{apoyo_tecnico?.data?.asunto}</p>
                    <div className="flex justify-between">
                        <span className=""> <span className="font-semibold">Cusa Aprehesion:</span>{apoyo_tecnico?.data?.causa_aprehesion} </span> 
                        <span className=""> <span className="font-semibold">Tipo Delito:</span>{apoyo_tecnico?.data?.causa_aprehesion} </span> 
                    </div>
                    <span className="block"> <span className="font-semibold">GDO:</span>{apoyo_tecnico?.data?.causa_aprehesion} </span> 
                </div>
            </div>

            {/* {JSON.stringify(apoyo_tecnico)} */}
        </>
    )
}