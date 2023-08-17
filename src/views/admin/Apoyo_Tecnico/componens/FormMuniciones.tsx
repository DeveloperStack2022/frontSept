
export default function FormMuniciones(){
    return (
        <>
            <form action="" className="px-2 pb-4">
                <div className=" flex flex-wrap">
                    <div className=" flex justify-between w-full md:w-2/2 px-2">
                        <div className="w-full pr-2">
                            <label htmlFor="arma">Ingrese (n) Cantidad de tipo de municiones</label>
                            <input type="number" id="cedula_pasaporte" autoComplete="off" className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`} />
                        </div>
                        <div className="self-end">
                            <button type="button"  className='text-base font-bold px-4 py-2 text-blue-700 bg-blue-100 hover:bg-blue-200 transition block rounded-md outline-offset-2 outline-transparent  focus:ring-2 '>Generar</button>
                        </div>
                    </div>
                </div>
                {/* Generate Arma Fuego */}
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/3 px-2">
                        <label htmlFor="fabricacion_arma">Tipo Municion</label>
                        <div className="relative">
                            <select id="fabricacion_arma" className="block appearance-none w-full  border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight outline-offset-2 outline-transparent focus:ring-blue-500 focus:border-blue-500 focus:bg-white focus:ring-2  ">
                                <option value="">---</option>
                                <option value='Arma_Larga'>Arma Larga</option>
                                <option value='Arma_Corta'>Arma Corta</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 px-2">
                        <label htmlFor="cantidad">Cantidad</label>
                        <input type="text" id="cantidad" autoComplete="off" className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                    </div>
                    <div className="w-full md:w-1/3 px-2">
                        <label htmlFor="calibre">Calibre</label>
                        <input type="text" id="calibre" autoComplete="off" className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                    </div>
                </div>
            </form>
        </>
    )
}