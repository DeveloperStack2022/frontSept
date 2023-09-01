import Card from '@/components/card'
import {FunctionComponent,SVGProps} from 'react'


interface IProps {
    title_card:string;
    numero:number;
    otro?:string | undefined
    Icon: FunctionComponent<SVGProps<SVGSVGElement> & { title?: string }>
}

const CardsCantidad = ({Icon,numero,title_card,otro}:IProps) => {
    return (
        <Card extra="w-full mb-2 p-6  border rounded-lg">
            <div className='flex justify-between content-center'>
                <h2 className='font-semibold text-lg text-gray-600 '>{title_card}</h2>
                <Icon className='h-6 w-6 text-blue-500' />
            </div>
            <span className='text-6xl font-extralight '>{numero} {otro && <span className='text-xl inline-flex items-center font-medium bg-green-50 px-2 py-1 rounded-lg text-green-700  text-center ring-1 ring-inset ring-green-500/20'>{otro}</span> } </span> 
        </Card>
    )
}

export default CardsCantidad