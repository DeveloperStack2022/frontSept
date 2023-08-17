const DetenidosForm = () => {
    return (
        <>
            <form action="" className="px-2 pb-4">
                <div className=" flex flex-wrap">
                    <div className="w-full md:w-1/2 px-2">
                        <label htmlFor="ciudadania">Ciudadania</label>
                        <input type="text" id="ciudadania" className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                    </div>
                    <div className="w-full md:w-1/2 px-2">
                        <label htmlFor="cedula_pasaporte">Numero Cedula/Pasaporte</label>
                        <input type="text" id="cedula_pasaporte" className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                    </div>
                </div>
                <div className="w-full px-2">
                    <label htmlFor="nombre_apellidos">Nombre - Apellidos</label>
                    <input type="text" id="nombre_apellidos"  className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                </div>
                <div className="flex flex-wrap px-2">
                    <label htmlFor="sexo" className="block w-full">Sexo</label>
                    <div className="flex w-full md:w-1/2 px-2 gap-x-2">
                        <div className="flex items-center">
                            <input id="masculino" type="radio" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                            <label htmlFor="masculino" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Masculino</label>
                        </div>
                        <div className="flex items-center">
                            <input id="femenino" type="radio"  name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 " />
                            <label htmlFor="femenino" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Femenino</label>
                        </div>

                    </div>
                </div>
                
            </form>
        </>
    )
}

export default DetenidosForm