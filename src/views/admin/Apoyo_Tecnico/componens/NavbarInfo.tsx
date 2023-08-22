interface IProps {
    nombre_caso:string;

    detenidos?:number
    total_armas?:number
    total_celulares?:number
    total_vehiculos?:number
    
}

export default function NavBarInfo({nombre_caso,detenidos,total_armas,total_vehiculos,total_celulares}:IProps){
    return (
        <nav className="">
            {/* Nombre Caso */}
            <div className="py-2 px-4  flex justify-between items-center">
                <div className="">
                    <span className="block text-gray-400 text-sm leading-4">Numero del Caso</span>
                    <span className="text-lg font-semibold">{nombre_caso}</span>
                </div>
                <div className="flex  gap-x-10">
                    {/* Numero de Detenidos */}
                    <div className="">
                        <span className="block text-gray-400 text-sm leading-4">Total de Detenidos</span>
                        <span className="font-semibold text-2xl">{detenidos}</span>
                    </div>
                    {/* Armas Encontradas */}
                    <div className="">
                        <span className="block text-gray-400 text-sm leading-4">Total de Armas</span>
                        <span className="font-semibold  text-2xl">{total_armas}</span>
                    </div>
                    {/* Total Celulares Encontrados */}
                    <div className="">
                        <span className="block text-gray-400 text-sm leading-4">Total de Celulares</span>
                        <span className="font-semibold  text-2xl">{total_celulares}</span>
                    </div>
                    {/* Total Vehiculos Encontrados */}
                    <div className="">
                        <span className="block text-gray-400 text-sm leading-4">Total de Vehiculos</span>
                        <span className="font-semibold  text-2xl">{total_vehiculos}</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}