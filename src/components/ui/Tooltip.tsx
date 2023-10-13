import {ReactNode,FC,forwardRef} from 'react'
import {cva,type VariantProps} from 'class-variance-authority'
import {cn} from '@/lib/utils'
import {Slot} from '@radix-ui/react-slot'


type Props = {
  children:ReactNode
}

const ToolTipVariants = cva(
  "absolute inset-y-0 left-12 hidden items-center group-hover:flex !z-50",
  {
    variants:{
      variant:{
        default:'bg-white'
      }
    },
    defaultVariants:{
      variant:'default',
    }
  }
)

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof ToolTipVariants> {
  asChild?:boolean
}

const Tooltip = forwardRef<HTMLDivElement,TooltipProps>(({asChild=false,className,...props},ref) => {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp  className={cn(ToolTipVariants({className}))} ref={ref} {...props} />
  )
}) 


// const  Tooltip:FC<Props> = ({ children }) => {
//   return (
//     <div className="absolute inset-y-0 left-12 hidden items-center group-hover:flex !z-20">
//       <div className="relative whitespace-nowrap rounded-md bg-white py-2 px-4 text-sm font-semibold text-gray-900 drop-shadow-lg">
//         <div className="absolute inset-y-0 -right-1 flex items-center">
//           <div className="h-2 w-2 rotate-45 bg-white" />
//         </div>
//         {children}
//       </div>
//     </div>
//   );
// }

Tooltip.displayName = 'Tooltip'
export {
  Tooltip,
  ToolTipVariants
}
