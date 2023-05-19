import {useState,FC,useEffect,useMemo} from 'react'
import {useReactTable,createColumnHelper,getCoreRowModel, flexRender,PaginationState,getPaginationRowModel,SortingState,getSortedRowModel} from '@tanstack/react-table'

// TODO: Custom Components
import ButtonPagination from './buttons-pagination'

//Types 
import {Solicitud} from '@/schemas/columns-solicitudes'
type Solicitante = {
    unidad:string;
}

const columnHelper = createColumnHelper<Solicitud>()


type Props = {
    loading:boolean;
    data: Solicitud[],
    fetch_data:(skip:number,limit:number) => void;
    pageCount:number;
    showOneDataSolicitud: (id:string) => void
    handleModal: () => void
    handleGetSolicitud: (id:string) => void
    setPageCount: any
    totalPage:number
}

const TableComponent:FC<Props> = ({data,fetch_data,loading,pageCount,setPageCount,showOneDataSolicitud,handleGetSolicitud,totalPage}) => {
    // TODO: States
    const [{pageIndex,pageSize}, setPageSize] = useState<PaginationState>({pageIndex:0,pageSize:5})
    const [Sorting, setSorting] = useState<SortingState>([]);

    // TODO: Hooks memo 
    const pagination = useMemo(() => ({pageIndex,pageSize}),[pageIndex,pageSize])
    const defaultDataMemo = useMemo(() => [], [])

   


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
        columnHelper.display({
            id: 'acciones',
            header: 'acciones',
            cell: props => (
                <>
                    <button className='bg-green-600 hover:bg-green-600/90 text-white text-xs py-1.5 px-2 mr-2 rounded-md font-semibold'>
                       Editar
                    </button>
                    <button className='bg-red-600 hover:bg-red-600/90 text-white text-xs py-1.5 px-2 rounded-md font-semibold mr-2'>Eliminar</button>
                    <button className='bg-gray-600 hover:bg-gray-600/90 text-white text-xs py-1.5 px-2 mr-2 rounded-md font-semibold' onClick={() => handleGetSolicitud(props.row.original.id)}>Detalles</button>
                </>
            )
        })
    ]

    const table = useReactTable({
        data:data ?? defaultDataMemo,
        columns:columns,
        onPaginationChange: setPageSize,
        state:{pagination},
        onSortingChange: setSorting,
        getCoreRowModel:getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        pageCount: totalPage ?? -1,
        manualPagination:true,
    })

    useEffect(() => {
        console.log('pages')
        let pageIndexN = pageIndex + 1
        fetch_data && fetch_data(pageIndexN,5)
    },[pageIndex,fetch_data])

    return (
        <div className="mt-7 overflow-x-auto">
            <table className="w-full whitespace-nowrap">
                <thead className="text-xs text-white bg-blue-600 uppercase dark:text-gray-400">
                    {table.getHeaderGroups().map(headersGroup => (
                        <tr key={headersGroup.id}>
                            {headersGroup.headers.map(header => (
                                <th className='px-6 py-3 text-left' key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header,header.getContext())}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.slice(0,pageSize).map(row => (
                        <tr className='bg-white dark:bg-gray-800 border-t' key={row.id} >
                           {row.getVisibleCells().map(cell => (
                                <td className='px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white text-sm' key={cell.id} >{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                           ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <button className="p-2 bg-blue-600 mr-2" onClick={() => table.previousPage()}>{'<'}</button> */}
            {/* <button className="p-2 bg-blue-600 " onClick={() => table.nextPage()}>{'>'}</button> */}
            <ButtonPagination nextPage={() => table.nextPage()} previousPage={() => {table.previousPage()}} />
        </div>
    )
}

export default TableComponent

// onClick={() => handleGetSolicitud(row.original.id)}