/**
 * 
    FICHA DE EMERGENCIA
    UNIDAD REQUIRENTE: UNCI
    Nro. de IDENTIDAD TELEFÓNICA A SOLICITAR:                                              

    0999999999

    ALIAS: PEPITO/ NINGUNO
    NOMBRE GDO: Los Lobos / en caso de no pertenecer se coloca NINGUNO
    NOMBRE DEL CASO: CUCHARA
    DELITO/CAUSA/INCIDENTE: ROBO

    GRADO Y NOMBRES ANALISTA SOLICITANTE: Tnte. Ariana Zambrano Montalvo
    CÉDULA: 120XXXXXX37
    TELÉFONO DEL SOLICITANTE: 09888888888
    FIN
 */

import { ChangeEvent, useState } from 'react'
import {useForm,useFieldArray} from 'react-hook-form'
import {FormField,Form,FormControl,FormItem,FormLabel,FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
// Icons 
import DeleteIcon from '@icons/delete-icon.svg?component'
// YUP: Validation
import {yupResolver} from '@hookform/resolvers/yup'

// REDUX: TOOLKIT 
import {SolicitudesEcu} from '@/schemas/solicitudes-ecu'
import {addData,AddRegistroEcu} from '@/store/features/registro-ecu-redux'

import {useAppDispatch,useAppSelector} from '@/hooks/redux'

type TypeValidationStateForm = Omit<SolicitudesEcu,'celulares'>

interface Props {
    btnTitle:string;
}

// COMPONENT: 

const formEcu = ({btnTitle}:Props) => {

    const form = useForm<SolicitudesEcu>({mode:'onBlur'});
    const formArray = useFieldArray<SolicitudesEcu,'celulares'>({control: form.control,name:'celulares'})
    const dispatch = useAppDispatch()

    const [NumeroGenerar,updateNumeroGenerarState] = useState<number>(0)

    const inputNCelulares = (e: ChangeEvent<HTMLInputElement>) => {
        const value:number  = parseInt(e.target.value)
        updateNumeroGenerarState(value)
    }
    const clickGenerar = () => {
        for (let i=0; i < NumeroGenerar; i++ ){
            formArray.append({
                numero_celular:''
            })
        }
    }
    
    const ClickDeleteFieldArray = (index:number) => {
        console.log(index)
        formArray.remove(index)
    }
    
    const handleSubmit = (values:SolicitudesEcu) => {
        console.log(values)
        dispatch(addData({...values}))
        dispatch(AddRegistroEcu({...values}))
    }

    return (
        <Form {...form}>
            <form className='flex flex-wrap bg-white p-4 rounded-md md:w-full' onSubmit={form.handleSubmit(handleSubmit)}>
                <div className="md:w-1/2 pr-2">
                    <h4 className='font-semibold'>Datos Agente Requirente</h4>
                    <FormField 
                        control={form.control}
                        name='unidad'
                        render={({field}) => (
                            <FormItem className=''>
                                <FormLabel className=''>
                                    Unidad Requirente
                                    <FormMessage />
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {/* TODO: Info Solicitante */}
                    <FormField 
                        control={form.control}
                        name='grado_nombres_agente'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className=''>
                                    Grado y Nombres del Solicitante          
                                    <FormMessage />
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name='numero_cedula_agente'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className=''>
                                    Cedula Agente Requirente          
                                    <FormMessage />
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name='numero_celular_agente'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className=''>
                                    Telefono Requirente          
                                    <FormMessage />
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="md:w-1/2">
                    <h4 className='font-semibold'>Datos Solicitados</h4>
                    
                    <FormField 
                        control={form.control}
                        name='alias'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className=''>
                                    Alias
                                    <FormMessage />
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name='nombre_gdo_perteneciente'
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className=''>
                                    Nombre GDO
                                    <FormMessage />
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        control={form.control}
                        name='nombre_caso'
                        render={({field}) => (
                            <FormItem className=''>
                                <FormLabel >
                                    Nombre del Caso
                                    <FormMessage />
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                <FormField
                    control={form.control} 
                    name='delito'
                    render={({field}) => (
                        <FormItem className=''>
                            <FormLabel className=''>
                                Delito
                                <FormMessage />
                            </FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                </div>
                <div className="flex flex-col w-full space-y-2">
                    <FormLabel>
                        N. Solicitados
                    </FormLabel>
                    <div className='flex gap-x-4'>
                        <Input type="number" className='w-2/3' onChange={inputNCelulares}  />
                        <Button type="button" className='inline-block' onClick={clickGenerar} >Generar</Button>
                    </div>
                </div>
                <div className="w-full flex flex-wrap">

                    {formArray.fields.map((item,index) => (
                        <FormField
                            key={index}
                            control={form.control} 
                            name={`celulares.[${index}].numero_celular`}
                            render={({field}) => (
                                <FormItem className='md:w-2/4 pr-2'>
                                    <FormLabel className='font-semibold text-base'>
                                        Numero Celular
                                        <FormMessage />
                                    </FormLabel>
        
                                    <div className="flex gap-x-2">
                                    <FormControl>
                                        <Input type="text" className='w-full' {...field} />
                                    </FormControl>
                                    <Button variant={'delete'} size='sm' onClick={() => ClickDeleteFieldArray(index)} type='button' className='text-white gap-x-2'><DeleteIcon className='h-4 w-4 stroke-current' />Eliminar</Button>
                                    </div>
        
                                </FormItem>
                            )}
                        />
                    ))}
                
                </div>
                <Button type="submit" className='self-end w-1/4 mt-2' >{btnTitle}</Button>
            </form>
        </Form>
    )
}

export default formEcu