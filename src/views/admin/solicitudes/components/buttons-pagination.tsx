import ArrowLeftIcon from '@/icons/table-icons/arrow-left.svg?component'
import ArrowRightIcon from '@/icons/table-icons/arrow-right.svg?component'

export interface ButtonsPagiantion<T> {
    previousPage: () => void
    nextPage: () => void
}

export default function ButtonPagination<T>({
    previousPage = () => {},
    nextPage = () => {}
    }:ButtonsPagiantion<T>){
    return(
        <div className="border border-gray-400 inline-block  bg-blue-600 text-white px-2 py-1 rounded-md mt-2  ">
            <div className="flex items-center hover:transition-all" >
                <button className=" hover:bg-blue-500  rounded-md p-2  ease-in-out delay-200" onClick={previousPage}>
                    <ArrowLeftIcon className='h-6 w-6 stroke-current ' />
                </button>
                <span className='p-2'>
                    1
                </span>
                <button className="hover:bg-blue-500  rounded-md p-2 ease-in-out delay-200 "  onClick={nextPage}>
                    <ArrowRightIcon className='h-6 w-6 stroke-current ' />
                </button>
            </div>
        </div>
    )
}