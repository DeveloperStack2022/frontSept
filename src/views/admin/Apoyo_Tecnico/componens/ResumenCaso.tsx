const ResumenCaso = () => {
    return (
        <form action="" className="px-2 pb-4">
            <div className="w-full px-2 ">
                <label htmlFor="direccion">Asunto</label>
                <textarea id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2  px-2">
                    <label htmlFor="unidad_ejecutora">Causa de Aprehesion</label>
                    <input type="text" id="unidad_ejecutora" className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                </div>            
                <div className="w-full md:w-1/2  px-2">
                    <label htmlFor="unidad_ejecutora">Tipo de Delito</label>
                    <input type="text" id="unidad_ejecutora" className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
                </div>
            </div>            
            <div className="w-full px-2">
                <label htmlFor="unidad_ejecutora">GDO Perteneciente</label>
                <input type="text" id="unidad_ejecutora" className={`w-full py-2 pl-2 pr-7  block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm`}/>
            </div>
        </form>
    )
}
export default ResumenCaso