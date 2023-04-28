import {useState,FC} from 'react'

type Props = {
    children: JSX.Element,
    isOpen:boolean;
    onClose: () => void;
}

const AlertComponent: FC<Props> = ({children,isOpen,onClose}) => {

    return (
        <div className={`flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800 ${!isOpen && 'hidden'}`}>
            <svg className='w-4 h-4 mr-2' strokeWidth="1.7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M20.043 21H3.957c-1.538 0-2.5-1.664-1.734-2.997l8.043-13.988c.77-1.337 2.699-1.337 3.468 0l8.043 13.988C22.543 19.336 21.58 21 20.043 21zM12 9v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"></path><path d="M12 17.01l.01-.011" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            <div>
                <span className="font-semibold">Error!</span> Email o contraseña incorrecta
            </div>
        </div>
    )
}

export default AlertComponent