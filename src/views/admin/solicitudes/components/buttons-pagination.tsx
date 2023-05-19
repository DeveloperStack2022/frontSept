import ArrowLeftIcon from '@/icons/table-icons/arrow-left.svg?component'
import ArrowRightIcon from '@/icons/table-icons/arrow-right.svg?component'

export interface ButtonsPagiantion<T> {
    previousPage: () => void
    nextPage: () => void
    disableNextPage:boolean
    disablePreviousPage:boolean
    pageActual: number
}

export default function ButtonPagination<T>({
    previousPage = () => {},
    nextPage = () => {},
    ...props
    }:ButtonsPagiantion<T>){
    const {disableNextPage,disablePreviousPage,pageActual} = props
    return(
        <div className=" inline-block  bg-gray-300 text-white px-2 py-1 rounded-md mt-2  ">
            <div className="flex items-center hover:transition-all" >
                <button className={`hover:bg-blue-300 bg-blue-600   rounded-md p-2  ease-in-out delay-200 disabled:bg-gray-300`} onClick={previousPage} disabled={disablePreviousPage ? true: false} >
                    <ArrowLeftIcon className='h-6 w-6 stroke-current ' />
                </button>
                <span className='p-2 text-blue-600 text-xl'>
                    {pageActual}
                </span>
                <button className="hover:bg-blue-500 bg-blue-600  rounded-md p-2 ease-in-out delay-200 disabled:bg-gray-300 "  onClick={nextPage} disabled={disableNextPage ? true : false}>
                    <ArrowRightIcon className='h-6 w-6 stroke-current ' />
                </button>
            </div>
        </div>
    )
}