type Steps = {
    title: string;
    numero:number
}
interface IProps {
    steps: Steps[]
    number_active:number
}

const StepComponent = ({...props}:IProps) => {
    const {steps,number_active} = props

    return (
        <>
            <div className="">
                <ol
                    className="flex items-center gap-2 text-xs font-medium text-gray-500 sm:gap-4"
                >
                    {steps.map(({numero,title},index) => (
                        <li key={index} className={`flex items-center justify-center gap-2 ${numero == number_active ? 'text-blue-600' : 'text-gray-500'}`}>
                            {numero == number_active ? (
                            <>
                                <span className="h-6 w-6 rounded bg-blue-50 text-center text-[14px]/6 font-bold">
                                    {numero}
                                </span>
                                <span className="text-base"> {title} </span> 
                            </>
                            ): <span className="h-6 w-6 rounded bg-blue-50 text-center text-[14px]/6 font-bold">
                            {numero !== number_active  && numero}
                        </span>}
                            
                        </li>
                    ))}
                </ol>
            </div>
        </>
    )
}

export default StepComponent