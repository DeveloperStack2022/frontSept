import FormEcu from '@/components/Forms/form-ecu'
import TableUi from '@/components/Table/table-ecu'
import {useAppDispatch,useAppSelector} from '@/hooks/redux'

export default function ViewEcu() {

  const {data,loading} = useAppSelector(state => state.ecuRegistro)

  return (
    <div className='grid grid-cols-2'>
      <FormEcu btnTitle='Enviar' />
      <TableUi data={[...data]}  />
    </div>
  )
}
