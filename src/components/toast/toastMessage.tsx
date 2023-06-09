import { useEffect } from "react";
import { Toast } from "./toastProvider";
import clsx from "clsx";
import InfoIcon from '@/icons/statusIcons/info.svg?component'
// Icons
import CloseIcons from '@/icons/x-icon.svg?component'
import ErrorIcon from '@/icons/statusIcons/error.svg?component'
import SuccessIcon from '@/icons/statusIcons/success.svg?component'
import WarningIcon from '@/icons/statusIcons/warning.svg?component'
import CloseIcon from '@/icons/close-icon.svg?component'

const VARIANTS = {
    info: {
      base: "bg-white border-blue-500",
      iconstyle: "text-blue-500 ",
      icon: <InfoIcon />,
      name: "Informativo",
    },
  
    error: {
      base: "bg-white border-red-500 ",
      iconstyle: "text-red-500 ",
      icon: <ErrorIcon />,
      name: "Error",
    },
  
    warning: {
      base: "bg-white border-yellow-500",
      iconstyle: "text-yellow-500 ",
      icon: <WarningIcon />,
      name: "Atencion",
    },
  
    success: {
      base: "bg-white border-green-500",
      iconstyle: "text-green-500 ",
      icon: <SuccessIcon />,
      name: "Exito",
    },
  };

export type Truncate =  | 'truncate-1-lines' | 'truncate-2-lines' | 'truncate-3-lines';

export type ToasMessage = {
    id:string
    lifetime?:number;
    variant?: keyof typeof VARIANTS | undefined
    onRemove?: (id:string) => void
    truncate?: Truncate
} & Toast


export default function ToastMessage({
    id,
    lifetime,
    header,
    message,
    onRemove,
    truncate,
    type,
    variant,
    icon
}: ToasMessage){
    const Var = type ? VARIANTS[type] : {
        base: "bg-white border-gray-600 ",
        iconstyle: "",
        icon: icon,
        name: header,
    }
    

    useEffect(() => {
        if(lifetime && onRemove ){
            setTimeout(() => {
                onRemove(id)
            }, lifetime);
        }
    },[lifetime])

    return (
        <div className={
            clsx(
                'flex w-full visible flex-row shadow-lg',
                'border-l-4 rounded-md duration-100 cursor-pointer',
                'transform transition-all hover:scale-102',
                Var.base,
                type && 'max-h-40'
            )}
        >
            <div className="flex flex-row p-2 flex-no-wrap w-full">
                
                {Var.icon && (
                    <div className={
                        clsx('flex items-center h-12 w-12','mx-auto text-xl select-none',Var.iconstyle)
                    }>
                        {Var.icon} 
                    </div>
                )}
                <div className="flex flex-col flex-no-wrap px-1 w-full">
                    <div className="flex my-auto font-bold select-none">{Var.name}</div>
                    <p className={clsx(
                        "-mt-0.5 my-auto break-all flex",
                        "text-gray-600 text-sm",
                        typeof message == 'string' && truncate
                    )}>
                        {message}
                    </p>
                </div>
                <div
                onClick={() => onRemove && onRemove(id)}
                 className={clsx(
                    "w-5 h-5 mr-2 items-center mx-auto",
                    "text-center leading-none text-lg"
                )}>
                    
                <CloseIcon className={clsx(
                    "mx-auto my-auto h-full text-center text-gray-600",
                    "cursor-pointer hover:scale-105 transform "
                    )} />
                </div>
            </div>
        </div>
    )
}