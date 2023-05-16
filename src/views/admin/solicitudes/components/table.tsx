import {useState,FC,useEffect,useMemo} from 'react'
import {useReactTable,createColumnHelper,getCoreRowModel, flexRender,PaginationState} from '@tanstack/react-table'

// TODO: Icons 
import EditIcon from '@/icons/table-icons/edit.svg?component'

//Types 
import {Solicitud} from '@/schemas/columns-solicitudes'
type Solicitante = {
    unidad:string;
}

const columnHelper = createColumnHelper<Solicitud>()


type Props = {
    loading:boolean;
    data: Solicitud[],
    fetch_data:(n_page:number) => void;
    pageCount:number;
    showOneDataSolicitud: (id:string) => void
    handleModal: () => void
    handleGetSolicitud: (id:string) => void
}

const TableComponent:FC<Props> = ({data,fetch_data,loading,pageCount,showOneDataSolicitud,handleModal,handleGetSolicitud}) => {
    // TODO: States
    const [{pageIndex,pageSize}, setPageSize] = useState<PaginationState>({pageIndex:0,pageSize:10})

    // TODO: Hooks memo 
    const pagination = useMemo(() => ({pageIndex,pageSize}),[pageIndex,pageSize])


    useEffect(() => {
        let pageIndexN = pageIndex + 1
        fetch_data && fetch_data(pageIndexN)
    },[pageIndex,fetch_data])


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
        // columnHelper.accessor('acciones', {
        //     id:'acciones',
        //     header: 'Accciones',
        //     cell: (info) => ()
        // }),
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
        data:data,
        columns:columns,
        getCoreRowModel:getCoreRowModel(),
        manualPagination:true,
        state:{
            pagination:pagination
        }
    })
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
        </div>
    )
}

export default TableComponent

// onClick={() => handleGetSolicitud(row.original.id)}