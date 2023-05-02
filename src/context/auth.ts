import React from 'react'
type AuthContextType = {
    login: ({email,password}:{email:string,password:string}) => void;
    logout:() => void;
    Value:string | null;
}


const AuthContext = React.createContext<AuthContextType>({
    login: () => {},
    logout: () => {},
    Value:null
})

export default AuthContext;