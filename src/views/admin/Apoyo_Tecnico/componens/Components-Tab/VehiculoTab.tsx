interface IProps {
    tipo_vehiculo:string;
    marca:string;
    modelo:string;
    placa:string;
}

export default function VehiculoTab({tipo_vehiculo,marca,modelo,placa}:IProps){
    return (
        <div className="border rounded-md px-4">
            <div className="flex flex-col">
               
                <span className="font-semibold">Tipo Vehiculo</span>
                <span className="text-gray-500 uppercase">{tipo_vehiculo}</span>
              
                <span className="font-semibold">Marca</span>
                <span className="text-gray-500 uppercase">{marca}</span>
               
                <span className="font-semibold">Modelo</span>
                <span className="text-gray-500 uppercase">{modelo}</span>
                
                <span className="font-semibold">Placa</span>
                <span className="text-gray-500">{placa}</span>
            </div>
    </div>
    )
}