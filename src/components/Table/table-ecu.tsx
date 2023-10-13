import {FC,useMemo} from 'react'
import {useReactTable,createColumnHelper,getCoreRowModel, flexRender,PaginationState,getPaginationRowModel,SortingState,getSortedRowModel} from '@tanstack/react-table'
import {Tooltip} from '@components/ui/Tooltip'
import MoreIcon from '@icons/more-icon.svg?component'

// FIXME: Validations 
import {SolicitudesEcu} from '@/schemas/solicitudes-ecu'
import {RegistrEcu} from '@/schemas/columns-registro-ecu'

interface IProps {
    fetchData?: (skip:number,limit:number) => void;
    loading?:boolean;
    data: SolicitudesEcu[] | RegistrEcu[] ,
    totalPages?:number;
    pageCount?:number
}

const columnHelper = createColumnHelper<SolicitudesEcu >()

const TableResultEcu:FC<IProps> = ({data}) => {
    const defaultDataMemo = useMemo(() => [], [])


    const columns = [
        // columnHelper.accessor('fecha',{
        //     header:'Fecha',
        //     cell: info => info.getValue()
        // }),
        columnHelper.accessor('unidad',{
            header:'Unidad S',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('nombre_caso',{
            header:'Nombre Caso',
            cell: info => info.getValue()
        }),
        columnHelper.display({
            id:'Acciones',
            header: 'Acciones',
            cell: props => (
                <div className='group relative'>
                    <MoreIcon className='hover:cursor-pointer mx-auto' />
                    <Tooltip >
                        <div className=" relative whitespace-nowrap rounded-md bg-white py-2 px-4 text-sm font-semibold text-gray-900 drop-shadow-lg">
                            <div className="absolute inset-y-0 -right-1 flex items-center">
                                <div className="h-2 w-2 rotate-45 bg-white" />
                            </div>
                            <div className="">
                                <p className="text-sm text-left font-semibold text-gray-900 ">
                                    Delito
                                </p>
                                <p className='text-sm text-left text-gray-500 '>
                                    {props.row.original.delito}
                                </p>
                            </div>                            
                            <div className="divide-y"></div>
                            <div className="">
                                <p className="text-sm text-left font-semibold text-gray-900 ">
                                    Delito
                                </p>
                                <p className='text-sm text-left text-gray-500 '>
                                    {props.row.original.delito}
                                </p>
                            </div>                            
                            <div className="divide-y"></div>
                            <div className="">
                                <p className="text-sm text-left font-semibold text-gray-900 ">
                                    Delito
                                </p>
                                <p className='text-sm text-left text-gray-500 '>
                                    {props.row.original.delito}
                                </p>
                            </div>                            
                            <div className="divide-y"></div>
                        </div>
                    </Tooltip>
                </div>
            )
        })
    ]

    const table = useReactTable({
        data: data ?? defaultDataMemo,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className=" ">
            <table className="border-separate border-spacing-0 border-spacing-y-2 rounded-md  ml-4 md:w-full  overflow-hidden md:max-h-[480px] ">
                <thead className="rounded-md bg-gray-500" >
                    {table.getHeaderGroups().map(headerG => (
                        <tr key={headerG.id}>
                            {headerG.headers.map(header => (
                                <th className="py-2 uppercase font-medium text-white text-sm ">
                                    {header.isPlaceholder ? null: flexRender(header.column.columnDef.header,header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody >
                    {table.getRowModel().rows.slice(0,10).map(row => (
                        <tr key={row.id} className="text-gray-500 text-center  font-semibold bg-white [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg ">
                            {row.getVisibleCells().map(cell => (
                                <td className="py-2  ">
                                    {flexRender(cell.column.columnDef.cell,cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableResultEcu