import {Route,Navigate} from 'react-router-dom'
import useAuth from '@/hooks/useAuth'

type Props = {
    children:JSX.Element
}

const ProctedRoute = ({children}:Props) => {
    const auth = useAuth();

    if(auth.Value == null ) {
        return <Navigate to='/auth/sign-in' replace />
    }

    return children
}

export default ProctedRoute