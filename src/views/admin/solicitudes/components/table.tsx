import {useState} from 'react'
import PhoneIcon from '@/icons/phone-icon.svg?component'

const TableComponent = () => {
    const [show, setShow] = useState(null);
    return (
        <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                    <th className='px-6 py-3'>CASO</th>
                    <th className="px-6 py-3">test</th>
                    <th className="pl-5">SOLICITANTE</th>
                    <th className="pl-5">N. CELULARES</th>
                </thead>
                <tbody>
                    <tr className='bg-white dark:bg-gray-800 border-t'>
                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            ALEXANDER
                        </td>
                        <td className="px-6 py-4">
                            White
                        </td>
                        <td className="px-6 py-4">
                            Laptop PC
                        </td>
                        <td className="px-6 py-4">
                            $1999
                        </td>
                    </tr>
                    <tr className='bg-white dark:bg-gray-800  border-t'>
                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            ALEXANDER
                        </td>
                        <td className="px-6 py-4">
                            White
                        </td>
                        <td className="px-6 py-4">
                            Laptop PC
                        </td>
                        <td className="px-6 py-4">
                            $1999
                        </td>
                    </tr>
                    <tr className='bg-white dark:bg-gray-800 border-t   '>
                        <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            ALEXANDER
                        </td>
                        <td className="px-6 py-4">
                            White
                        </td>
                        <td className="px-6 py-4">
                            Laptop PC
                        </td>
                        <td className="px-6 py-4">
                            $1999
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent