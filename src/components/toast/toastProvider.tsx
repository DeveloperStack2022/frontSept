import {ReactNode, createContext, useCallback, useContext,useState} from 'react'
import ToastContainer, {ToastContainerProps} from './toastContainer'
import {Truncate} from './toastMessage'

export type ToastProviderProps = {
    children: ReactNode
} & ToastContainerProps

type ToastMessageType = 'info' | 'success' | 'warning' | 'error'

export type Toast = {
    id:string;
    lifetime:number;
    message:string | ReactNode
    type?: ToastMessageType
    truncate?:Truncate
    header?:string;
    icon?:ReactNode
}

export type ToastContextType = {
    data: Array<Toast>
    pushError(message: string, lifetime?: number, truncate?: Truncate): void;
    pushWarning(message: string, lifetime?: number, truncate?: Truncate): void;
    pushSuccess(message: string, lifetime?: number, truncate?: Truncate): void;
    pushInfo(message: string, lifetime?: number, truncate?: Truncate): void;
    push(
        message: string,
        type: ToastMessageType,
        lifetime?: number,
        truncate?: Truncate
      ): void;
    pushCustom(
        message: string | React.ReactNode,
        lifetime: number,
        truncate?: Truncate,
        icon?:React.ReactNode
    ): void;
    remove(id: string): void;

}   

export const ToastContext = createContext<ToastContextType | undefined >(undefined)

function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
}

export const useToast = () => useContext(ToastContext)
const DEFAULT_INTERVAL = 2500;

// Implementation 

export default function ToastProvider({
    children,
    variant
}:ToastProviderProps){
    const [Data, setData] = useState<Array<Toast>>([])

    const push = useCallback((message: string,
        type: ToastMessageType,
        lifetime?: number,
        truncate?: Truncate,
        ) => {
            if(message){
                const new_item: Toast = {
                    id: uuidv4(),
                    message,
                    lifetime: lifetime ? lifetime : DEFAULT_INTERVAL,
                    type:type,
                    truncate,

                }
                setData((prev) => [...prev,new_item])

            }
    },[setData,Data])

    const PushError = useCallback(
        (message: string, lifetime?: number, truncate?: Truncate) =>
          push(message, "error", lifetime, truncate),
        [push]
      );
      const pushWarning = useCallback(
        (message: string, lifetime?: number, truncate?: Truncate) =>
          push(message, "warning", lifetime, truncate),
        [push]
      );
      const pushSuccess = useCallback(
        (message: string, lifetime?: number, truncate?: Truncate) =>
          push(message, "success", lifetime, truncate),
        [push]
      );
      const pushInfo = useCallback(
        (message: string, lifetime?: number, truncate?: Truncate) =>
          push(message, "info", lifetime, truncate),
        [push]
      );
      const pushCustom = useCallback(
        (
          message: string | React.ReactNode,
          lifetime?: number,
          truncate?: Truncate,
        ) => {
          if (message) {
            const new_item: Toast = {
              id: uuidv4(),
              message: message,
              lifetime: lifetime ? lifetime : DEFAULT_INTERVAL,
              truncate: truncate,
              type: undefined,
            };
    
            setData((prevState) => [...prevState, new_item]);
          }
        },
        [setData, Data]
      );

      const ToastContexd = useCallback(() => {
        return {
          data: Data,
          pushError: PushError,
          pushWarning: pushWarning,
          pushSuccess: pushSuccess,
          pushInfo: pushInfo,
          push: push,
          pushCustom: pushCustom,
    
          async remove(id: string) {
            setData((prevState) => prevState.filter((e) => e.id != id));
          },
        };
      }, [
        Data,
        setData,
        PushError,
        pushWarning,
        pushSuccess,
        pushInfo,
        push,
        pushCustom,
      ]);

      return (
        <ToastContext.Provider value={ToastContexd()}>
            <ToastContainer variant={variant} /> 
            {children}
        </ToastContext.Provider>
      )
}