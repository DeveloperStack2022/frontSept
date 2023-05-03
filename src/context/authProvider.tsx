import {useMemo,createContext,useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useLocalStorage} from '@/hooks/useLocalStorage'
import AuthContext from './auth'
import {FormInicioSessionType} from '@/schemas/form'


type Props = {
    children: JSX.Element
}


export const AuthProvider = ({children}:Props) => {
    const {setItem,removeItem} = useLocalStorage()
    const navigate = useNavigate();
    const [Value, setValue] = useState<string | null>(() => window.localStorage.getItem('authToken'));


    const login = async ({email,password}:FormInicioSessionType) => {
        // Service Authentication API - Server {Promise}
        const res = await fetch('http://localhost:5050/api/login',{
        method:'POST',
        body:JSON.stringify({
            email,
            password
        }),
        headers:{
            'Content-Type':"Application/json"
        }
       })
       // -> dataResponse -> {accessToken: stringToken,name:stringNameUser}
       if(res.status >= 200 && res.status <= 299){
           const dataResponse = await res.json()
           setItem('authToken',JSON.stringify(dataResponse));
           setValue(dataResponse)
           return navigate('/admin/default')
       }
    };  

    const logout = () => {
        removeItem('authToken');
        setValue(null)
        navigate('/auth/sign-in')
    }

    const value = useMemo(() =>({
        login,
        Value,
        logout,
        setValue
    }),[Value])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext