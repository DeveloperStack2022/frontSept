import {useReactTable,createColumnHelper,getCoreRowModel, flexRender,PaginationState,getPaginationRowModel,SortingState,getSortedRowModel} from '@tanstack/react-table'
import {useState,FC,useEffect,useMemo} from 'react'

// Types 
import {ApoyoTecnico} from '@/schemas/columns-apoyo-tecnico'



type Detenidos = {
    detenidos:string;
}

const columnHelper = createColumnHelper<ApoyoTecnico>()
type IProps = {
    loading: boolean
    data: ApoyoTecnico[]
}
const TableCompoents: FC<IProps> = ({data,loading}) => {
    // TODO: Hooks Memo 
    const defaultDataMemo = useMemo(() => [], [])
    const columns  = [
        columnHelper.accessor('nombre_caso',{
            header:'Nombre Caso',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('fecha',{
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('detenidos',{
            id:'detenidos',
            header: 'N. Detenidos',
            cell: info => info.getValue()
        }),
        columnHelper.display({
            id: 'Acciones',
            header: 'Acciones',
            cell: props => (
                <button className='bg-blue-600 hover:bg-blue-600/90 text-white text-xs py-1.5 px-2 mr-2 rounded-md font-semibold'>Detalles</button>
            )
        })
    ]
    
    const table = useReactTable({
        data:data ?? defaultDataMemo,
        columns:columns,
        getCoreRowModel:getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // debugTable: true,
        manualPagination:true,
    })

    return (
        <>
            <table className='w-full whitespace-nowrap'>
                <thead className='text-sm  bg-white uppercase dark:text-gray-400 font-light tracking-normal py-4'>
                    {table.getHeaderGroups().map(headersGroup => (
                        <tr  key={headersGroup.id}>
                            {headersGroup.headers.map(header => (
                                <th className='px-2 py-4 text-left'>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header,header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody >
                    {table.getRowModel().rows.slice(0,10).map(row => (
                        <tr className={` bg-white mb-2`} key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td>
                                    <span className='py-1.5 px-2'>{flexRender(cell.column.columnDef.cell,cell.getContext())} </span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TableCompoents