import FormEcu from '@/components/Forms/form-ecu'
import TableUi from '@/components/Table/table-ecu'
export default function ViewEcu() {
  return (
    <div className="flex">
      <FormEcu btnTitle='Enviar' />
      <TableUi />
    </div>
  )
}
