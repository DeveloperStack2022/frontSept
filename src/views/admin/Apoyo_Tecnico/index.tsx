import {useState} from 'react'
import {useForm,useFieldArray} from 'react-hook-form'


// Components 
import StepComponent from './componens/step'
import Card from '@/components/card'
// Components Form 
import FormDatosGenerales from './componens/datosGenerales'
import FormDetenidos from './componens/Detenidos'
import ResumenCaso from './componens/ResumenCaso'
import FormArmas from './componens/FormArmas'
import FormMuniciones  from './componens/FormMuniciones'
import FormDinero from './componens/FormDinero'
import DetalisFinally from './componens/DetalisFinally'
import FormVehiculo from './componens/FormVehiculo'
import { yupResolver } from '@hookform/resolvers/yup'
import ValidationSchema,{ValidationType} from '@/schemas/apoyo-tecnico'





// FIXME: 
type TypeValidationStateForm = Omit<ValidationType,''>


//TODO: Array Data 
const DatosSepts = [
    {
        numero:1,
        title:'Datos Generales'
    },
    {
        numero:2,
        title:'Resumen Caso'
    },
    {
        numero:3,
        title:'Detenidos'
    },
    {
        numero: 4,
        title:'Armas'
    },
    {
        numero:5,
        title:'Municiones'
    },
    {
        numero:6,
        title:'Dinero'
    },
    {
        numero: 7,
        title: 'Vehiculos'
    },
    {
        numero:8,
        title:'Presentacion'
    }
]

// TODO:Components Render 
const ComponentsRender = (value:number) => {
    switch (value) {
        case 1:
            return <FormDatosGenerales />
        case 2: 
            return <ResumenCaso />
        case 3:
            return <FormDetenidos />
        case 4: 
            return <FormArmas />
        case 5: 
            return <FormMuniciones />
        case 6:
            return <FormDinero />
        case 7:
            return <FormVehiculo />
        case 8:
            return <DetalisFinally />
    }
}


// TODO: 
const Steps  = () => {

    //FIXME: React hooks form 
    const {register,handleSubmit,watch,control,reset,formState:{errors},setValue,trigger} = useForm<TypeValidationStateForm>({resolver: yupResolver(ValidationSchema),mode:'onBlur'})

    const {fields:FieldsDetenidos,append:AgregarDetenidos,remove:RemoveDetenidos} = useFieldArray<TypeValidationStateForm,'detenidos'>({control,name:'detenidos'})
    const {fields:FieldsMuniciones,append:AgregarMuniciones,remove:RemoveMuniciones} = useFieldArray<TypeValidationStateForm,'municiones'>({control,name:'municiones'})

   

    // State
    const [StepNumber,updateStepNumber] = useState<number>(1)
    const [TitleSteps, setTitleSteps] = useState(['Datos Generales','Resumen Caso','Detenidos','Armas','Municiones','Dinero','Vehiculo','Presentacion'])
    // Events
    const handleIncrement = () => updateStepNumber(prev => prev + 1)
    const handleDecrement = () => updateStepNumber(prev => prev - 1)




    return (
        <Card extra='w-full md:w-1/2 min-h-[487px]'>
            <div className="p-4  flex justify-center">
                <StepComponent steps={DatosSepts}
                    number_active={StepNumber} />
            </div>
            {/* Title Forms */}
            <h2 className="text-gray-700 text-2xl font-bold text-center mx-2">{TitleSteps[StepNumber - 1]}</h2>
            {ComponentsRender(StepNumber)}
            <div className=" h-full flex items-end justify-center pb-2">
                <div className="flex gap-x-2">
                    <button className={`text-white font-bold py-2 px-4 rounded ${StepNumber != 1 ? 'bg-blue-500 hover:bg-blue-600': 'bg-gray-300'}`} onClick={handleDecrement} disabled={StepNumber == 1}>Regresar</button>
                    <button className={`text-white font-bold py-2 px-4 rounded ${DatosSepts.length == StepNumber ? 'bg-gray-300': 'bg-blue-500 hover:bg-blue-600'}`} onClick={handleIncrement} disabled={DatosSepts.length == StepNumber} >Siguiente</button>
                </div>
            </div>
        </Card>
    )
}
export default Steps