import {useState} from 'react'
import PhoneIcon from '@/icons/phone-icon.svg?component'

const TableComponent = () => {
    const [show, setShow] = useState(null);
    return (
        <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
                <tbody>
                    <tr className="h-16 border border-gray-100 rounded">
                        <td>
                            <div className="flex items-center pl-5">
                                <p className="text-base font-medium leading-none text-gray-700 mr-2">MOLINA ALEXANDER</p>
                            </div>
                        </td>
                        <td className="pl-24">
                            <div className="flex items-center">
                                <p className="text-sm leading-none text-gray-600 ml-2">ASOCIACIÓN ILÍCITA.</p>
                            </div>
                        </td>
                        <td className="pl-5">
                            <div className="flex items-center">
                                
                                <p className="text-sm leading-none text-gray-600 ml-2">SGOS. MONTALVAN GOMEZ DIEGO FERNANDO</p>
                            </div>
                        </td>
                        <td className="pl-5">
                            <div className="flex items-center">
                                <PhoneIcon className='w-4 h-4 text-blue-500' />
                                <span className="text-sm leading-none text-blue-600 ml-2  ">3</span>
                            </div>
                        </td>
                        
                        
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent