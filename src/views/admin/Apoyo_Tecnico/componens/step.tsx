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
                    {/* <li className="flex ">
                        <span className="rounded bg-green-50 text-green-600 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                            />
                        </svg>
                        </span>
                    </li> */}
                    {/*  */}
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