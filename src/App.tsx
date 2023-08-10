import {Routes,Route,Navigate} from 'react-router-dom'
import AdminLayout from './layouts/admin'
import AuthLayout from './layouts/auth'
import {AuthProvider} from '@/context/authProvider'

const App = () => {
  return (
      <AuthProvider >
          <Routes>
              <Route path='admin/*' element={ <AdminLayout />} />
            <Route path="auth/*" element={<AuthLayout />} />
            <Route path="/" element={<Navigate to="/admin" replace />} />
          </Routes>
      </AuthProvider>
  )
}
export default App