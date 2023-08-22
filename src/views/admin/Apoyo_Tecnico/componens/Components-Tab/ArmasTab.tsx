interface IProps {
    tipo_arma: string;
    calibre?:string;
    cantidad:number
    tipo_fabricacion:string;
}

export default function ArmasTab({cantidad,tipo_arma,tipo_fabricacion,calibre}:IProps){
    return (
        <div className="border rounded-md px-4">
            <div className="flex flex-col">
                {/* Tipo Arma */}
                <span className="font-semibold">Tipo Arma</span>
                <span className="text-gray-500">{tipo_arma}</span>
                {/* Tipo Fabricacion */}
                <span className="font-semibold">Tipo Fabricacion</span>
                <span className="text-gray-500">{tipo_fabricacion}</span>
                {/* Cantidad */}
                <span className="font-semibold">Cantidad</span>
                <span className="text-gray-500">{cantidad}</span>
                {/* Calibre */}
                <span className="font-semibold">Calibre</span>
                <span className="text-gray-500 uppercase">{calibre}</span>
            </div>
        </div>
    )
}