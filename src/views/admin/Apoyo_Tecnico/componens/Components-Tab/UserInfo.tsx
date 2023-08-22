interface Iprops {
    numero_cedula:string;
    ciudadania:string;
    nombres_completos:string;
    sexo:string;
}
export default function UserInfo({ciudadania,nombres_completos,numero_cedula,sexo}:Iprops){
    return (
        <div className="border rounded-md px-4">
                <div className="flex flex-col">
                    {/* Nombre Completos */}
                    <span className="font-semibold">Nombres</span>
                    <span className="text-gray-500">{nombres_completos}</span>
                    {/* Cedula */}
                    <span className="font-semibold">Numero Identificacion</span>
                    <span className="text-gray-500">{numero_cedula}</span>
                    {/* Sexo */}
                    <span className="font-semibold">Sexo</span>
                    <span className="text-gray-500 uppercase">{sexo}</span>
                    {/* Ciudadania */}
                    <span className="font-semibold">Ciudadania</span>
                    <span className="text-gray-500">{ciudadania}</span>
                </div>
        </div>
    )
}