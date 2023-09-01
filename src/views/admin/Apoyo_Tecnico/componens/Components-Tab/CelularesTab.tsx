interface IProps {
    marca: string;
    modelo?:string;
    numero?:string
}

export default function ArmasTab({marca,modelo,numero}:IProps){
    return (
        <div className="border rounded-md px-4">
            <div className="flex flex-col">

                <span className="font-semibold">Marca</span>
                <span className="text-gray-500">{marca}</span>

                <span className="font-semibold">Modelo</span>
                <span className="text-gray-500">{modelo}</span>

                <span className="font-semibold">Cantidad</span>
                <span className="text-gray-500">{numero}</span>
            </div>
        </div>
    )
}