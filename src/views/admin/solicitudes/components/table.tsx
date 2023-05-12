import {useState,FC,useEffect} from 'react'
import {useReactTable,createColumnHelper,getCoreRowModel, flexRender,PaginationState} from '@tanstack/react-table'
//Types 
import {Solicitud} from '@/schemas/columns-solicitudes'
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
    }),
]

type Props = {
    loading:boolean;
    data: Solicitud[],
    fetch_data:(n_page:number) => void;
    pageCount:number;
    showOneDataSolicitud: (id:string) => void
    handleModal: () => void
}

const TableComponent:FC<Props> = ({data,fetch_data,loading,pageCount,showOneDataSolicitud,handleModal}) => {
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
                <thead className="text-xs text-white bg-gray-600 uppercase dark:text-gray-400">
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
                        <tr className='bg-white dark:bg-gray-800 border-t hover:bg-gray-200/50 cursor-pointer' key={row.id} onClick={handleModal}>
                           {row.getVisibleCells().map(cell => (
                                <td className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm' key={cell.id} >{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                           ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableComponent