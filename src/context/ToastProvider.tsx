import {ReactNode,Dispatch,SetStateAction, createContext,useState, useContext} from 'react'
import {ToastContainerProps} from '@/components/toast/toastContainer'

export type GlobalContextType = {
    position:ToastContainerProps
    setPosition:Dispatch<SetStateAction<ToastContainerProps>>
}

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined)

export const useGlobalState = () => useContext(GlobalContext)

type ProviderProps = {
    children: ReactNode
}

const Providers = ({children}:ProviderProps) => {

    const [position, setPosition] = useState<ToastContainerProps>({
        variant: "top_right",
      });

    return (
        <GlobalContext.Provider value={{
            position,
            setPosition:setPosition
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default Providers