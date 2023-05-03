import {FC,useState} from 'react'

// Icons 
import ErrorIcon from '@/icons/error-icon.svg?component'
import SuccessIcon from '@/icons/check-icon.svg?component'
// Props 
type Props = {
    isOpen:boolean;
    onClose:() => void;
    children: JSX.Element
    status: string;
    message:string;
}
const ModalComponent: FC<Props> = ({children,message,status,isOpen,onClose}) => {

    const handleClose = () => {
        onClose()
    }

    return (
        <div className={`fixed flex justify-center items-center top-0 left-0 right-0 z-50  p-4  md:inset-0  max-h-full bg-black/[.54] ${!isOpen && 'hidden'}`}>
            <div className="relative w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={handleClose} type='button' className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white '>
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd">
                            </path>
                        </svg>
                    </button>
                    <div className="p-6 text-center">
                        {status == 'success' ? <SuccessIcon className='w-10 h-10 m-auto text-green-500 ' /> : <ErrorIcon className='w-10 h-10 m-auto text-red-500 ' />}
                        
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{message}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalComponent