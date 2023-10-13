interface IProps {
    tipo_divisa: string;
    valor_total:number
}

export default function DineroTab({tipo_divisa,valor_total}:IProps){
    return (
        <div className="border rounded-md px-4">
            <div className="flex flex-col">
                {/* Tipo Divisas */}
                <span className="font-semibold">Tipo Divisas</span>
                <span className="text-gray-500">{tipo_divisa}</span>
                {/* Valor */}
                <span className="font-semibold">Valor</span>
                <span className="text-gray-500">$ {valor_total}</span>
            </div>
        </div>
    )
}