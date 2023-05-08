import {useState,FC,useEffect} from 'react'
import PhoneIcon from '@/icons/phone-icon.svg?component'
import {useReactTable,createColumnHelper,getCoreRowModel, flexRender,PaginationState} from '@tanstack/react-table'
//Types 
import {Solicitud} from '@/schemas/columns-solicitudes'


// Example Data 
// const data: Solicitud[] = [{
//     caso:'caso test',
//     delito: 'delito test',
//     evento:'evento test'
// }]

type Solicitante = {
    unidad:string;
}

const columnHelper = createColumnHelper<Solicitud>()
const columns  = [
    columnHelper.accessor('caso',{
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('delito',{
        cell: info => info.getValue(),
    }),
    columnHelper.accessor('solicitante_result',{
        id:'solicitante_result',
        header: 'Unidad',
        cell: (info) => (info.getValue() as Solicitante ).unidad
    })
]

type Props = {
    loading:boolean;
    data: Solicitud[],
    fetch_data:(n_page:number) => void;
    pageCount:number;
}

const TableComponent:FC<Props> = ({data,fetch_data,loading,pageCount}) => {
    // TODO: States
    const [{pageIndex,pageSize}, setPageSize] = useState<PaginationState>({pageIndex:0,pageSize:10})
    const table = useReactTable({data:data,columns:columns,getCoreRowModel:getCoreRowModel()})



    useEffect(() => {
        let pageIndexN = pageIndex + 1
        fetch_data && fetch_data(pageIndexN)
    },[pageIndex,fetch_data])


    return (
        <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                    {table.getHeaderGroups().map(headersGroup => (
                        <tr key={headersGroup.id}>
                            {headersGroup.headers.map(header => (
                                <th className='px-6 py-3 text-left' key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header,header.getContext())}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr className='bg-white dark:bg-gray-800 border-t' key={row.id}>
                           {row.getVisibleCells().map(cell => (
                                <td className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white' key={cell.id} >{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                           ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent