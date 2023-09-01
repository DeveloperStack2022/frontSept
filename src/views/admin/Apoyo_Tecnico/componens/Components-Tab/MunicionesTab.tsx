interface IProps {
    tipo_municion: string;
    calibre?:string;
    cantidad:number
}

export default function ArmasTab({cantidad,tipo_municion,calibre}:IProps){
    return (
        <div className="border rounded-md px-4">
            <div className="flex flex-col">
                {/* Tipo Arma */}
                <span className="font-semibold">Tipo Municion</span>
                <span className="text-gray-500">{tipo_municion}</span>
                {/* Tipo Fabricacion */}
                <span className="font-semibold">Calibre</span>
                <span className="text-gray-500">{calibre}</span>
                <span className="font-semibold">Cantidad</span>
                <span className="text-gray-500">{cantidad}</span>
            </div>
        </div>
    )
}