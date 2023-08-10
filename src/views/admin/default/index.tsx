import AddSolicitudForm from './components/form-add-solicitud'
import ToastProvider from '@/components/toast/toastProvider'

const MainDashboard = () => {
    return (
        <ToastProvider variant='bottom_middle'>
            <div className='flex flex-col w-3/4'>
                <AddSolicitudForm  />
            </div>
        </ToastProvider>
    ) 
}

export default MainDashboard