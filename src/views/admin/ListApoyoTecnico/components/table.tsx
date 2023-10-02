import {useReactTable,createColumnHelper,getCoreRowModel, flexRender,PaginationState,getPaginationRowModel,SortingState,getSortedRowModel} from '@tanstack/react-table'
import {useState,FC,useEffect,useMemo,Dispatch,SetStateAction} from 'react'
// COMPONENT: 
import ButtonPagination from '@/views/admin/solicitudes/components/buttons-pagination'
import {format} from 'date-fns'
import es from 'date-fns/locale/es'
// Types 
import {ApoyoTecnico} from '@/schemas/columns-apoyo-tecnico'



type Detenidos = {
    detenidos:string;
}

const columnHelper = createColumnHelper<ApoyoTecnico>()
type IProps = {
    fetchData(skip:number,limit:number):void;
    loading: boolean
    data: ApoyoTecnico[]
    openModal: (id:string) => void
    totalPages:number | 1
    pageCount:number
    setPageCount:Dispatch<SetStateAction<number>>
}
const TableCompoents: FC<IProps> = ({data,loading,openModal,totalPages,pageCount,setPageCount,fetchData,...props}) => {
    const [Sorting, setSorting] = useState<SortingState>([]);
    const [{pageIndex,pageSize}, setPageSize] = useState<PaginationState>({pageIndex:0,pageSize:5})
    // TODO: Hooks Memo 
    const defaultDataMemo = useMemo(() => [], [])
    const pagination = useMemo(() => ({pageIndex,pageSize}),[pageIndex,pageSize])

    const columns  = [
        columnHelper.accessor('nombre_caso',{
            header:'Nombre Caso',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('fecha',{
            cell: info => <span className='text-gray-500 font-semibold'> {format(new Date(info.getValue()),'d MMM, yyyy',{locale:es}).toLocaleUpperCase()} </span>
        }),
        columnHelper.accessor('n_detenidos',{
            id:'detenidos',
            header: 'N. Detenidos',
            cell: info => info.getValue()
        }),
        columnHelper.display({
            id: 'Acciones',
            header: 'Acciones',
            cell: props => (
                <button className='bg-blue-600 hover:bg-blue-600/90 text-white text-xs py-1.5 px-2 mr-2 rounded-md font-semibold' onClick={() => openModal(props.row.original.id)}>Mostrar Img</button>
            )
        })
    ]
    
    const table = useReactTable({
        data:data ?? defaultDataMemo,
        columns:columns,
        state:{pagination},
        onSortingChange: setSorting,
        onPaginationChange: setPageSize,
        getCoreRowModel:getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        pageCount: totalPages ?? -1,
        manualPagination:true,
    })

    useEffect(() => {
      let pageIndexN = pageIndex + 1
      fetchData && fetchData(pageIndexN,10);
    }, [pageIndex,fetchData])
    

    return (
        <>
            <table className='w-full whitespace-nowrap rounded-lg mt-5'>
                <thead className='text-sm  bg-white uppercase dark:text-gray-400 font-light tracking-normal py-4'>
                    {table.getHeaderGroups().map(headersGroup => (
                        <tr  key={headersGroup.id}>
                            {headersGroup.headers.map(header => (
                                <th className='px-4 py-4 text-left'>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header,header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody >
                    {table.getRowModel().rows.slice(0,pageSize).map(row => (
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
            <ButtonPagination pageActual={pageIndex + 1} disableNextPage={!table.getCanNextPage()} disablePreviousPage={!table.getCanPreviousPage()} nextPage={() =>table.nextPage()} previousPage={() => table.previousPage()} />
        </>
    )
}

export default TableCompoents