import {useForm} from 'react-hook-form'
import {FormField,Form,FormItem,FormLabel,FormControl,FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import { Button } from '../ui/button'
// Validations
import {yupResolver} from '@hookform/resolvers/yup'
import {validationPraeYup,ValidationFormPrae} from '@/schemas/solicitudes-prae'

// REDUX: imports 
import {addData,fetchContent} from '@/store/features/prae-action-redux'
import { useAppDispatch, useAppSelector } from "@/hooks/redux";


/**
 * @Example
 * dispatch(save_data({...data,upload_anexo:upload_anexo}))
 */

interface Props {
    btnTitle: string;
}


const formPrae = ({btnTitle}:Props) => {
    const dispatch = useAppDispatch()

    const form = useForm<ValidationFormPrae>({resolver:yupResolver(validationPraeYup),mode:'onBlur'})
    
    const onSubmit = async (values:ValidationFormPrae) => {
        console.log(values)
        dispatch(addData({...values}))
        dispatch(fetchContent({...values}))
    }

    return (
        <Form {...form}>
            <form className='flex flex-wrap  bg-white p-4 rounded-md ' onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="numero_cl"
                        render={({field}) => (
                            <FormItem className=' md:w-1/2 pr-2 '>
                            <FormLabel className='font-semibold text-base flex justify-between'>
                                Numero Cedula
                                <FormMessage />
                            </FormLabel>
                            <FormControl >
                                    <Input type="text" {...field}   />
                            </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="unidad_req"
                        render={({field}) => (
                            <FormItem className='md:w-1/2 '>
                            <FormLabel className='font-semibold text-base flex justify-between'>
                                Unidad Requirente
                                <FormMessage />
                            </FormLabel>
                            <FormControl >
                                    <Input type="text" {...field}   />
                            </FormControl>
                          
                            </FormItem>
                        )}
                    />
                <FormField
                    control={form.control}
                    name="agente_req"
                    render={({field}) => (
                        <FormItem className='md:w-1/2 pr-2'>
                           <FormLabel className='font-semibold text-base flex justify-between'>
                                Agente Requirente
                                <FormMessage />
                           </FormLabel>
                           <FormControl >
                                <Input type="text" {...field}   />
                           </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="motivo"
                    render={({field}) => (
                        <FormItem className='md:w-1/2 '>
                           <FormLabel className='font-semibold text-base flex justify-between'>
                                Motivo
                                <FormMessage />
                           </FormLabel>
                           <FormControl >
                                <Input type="text" {...field}   />
                           </FormControl>
                           
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cedula"
                    render={({field}) => (
                        <FormItem className='md:w-1/2 pr-2 '>
                           <FormLabel className='font-semibold text-base flex justify-between'>
                                Cedula
                                <FormMessage />
                           </FormLabel>
                           <FormControl >
                                <Input type="text" {...field}   />
                           </FormControl>
                           
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nombres_apellidos"
                    render={({field}) => (
                        <FormItem className='md:w-1/2'>
                           <FormLabel className='font-semibold text-base flex justify-between'>
                                Nombre Apellidos
                                <FormMessage />
                           </FormLabel>
                           <FormControl >
                                <Input type="text" {...field}   />
                           </FormControl>
                           
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="placas"
                    render={({field}) => (
                        <FormItem className='md:w-1/3 pr-2'>
                           <FormLabel className='font-semibold text-base flex justify-between'>
                                Placas
                                <FormMessage />
                           </FormLabel>
                           <FormControl >
                                <Input type="text" {...field}   />
                           </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="celular"
                    render={({field}) => (
                        <FormItem className='md:w-1/3 pr-2 '>
                           <FormLabel className='font-semibold text-base flex justify-between'>
                                Celular
                                <FormMessage />
                           </FormLabel>
                           <FormControl >
                                <Input type="text" {...field}   />
                           </FormControl>
                          
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="telefono"
                    render={({field}) => (
                        <FormItem className='md:w-1/3'>
                           <FormLabel className='font-semibold text-base flex justify-between'>
                                Telefono
                                <FormMessage />
                           </FormLabel>
                           <FormControl >
                                <Input type="text" {...field}   />
                           </FormControl>
                          
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="empresa"
                    render={({field}) => (
                        <FormItem className='md:w-1/2 md:pr-2'>
                           <FormLabel className='font-semibold text-base flex justify-between'>
                                Empresa
                                <FormMessage />
                           </FormLabel>
                           <FormControl >
                                <Input type="text" {...field}   />
                           </FormControl>
                           
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="direccion"
                    render={({field}) => (
                        <FormItem className='md:w-1/2  '>
                           <FormLabel className='font-semibold text-base flex justify-between'>
                                Direccion
                                <FormMessage />
                           </FormLabel>
                           <FormControl >
                                <Input type="text" {...field}   />
                           </FormControl>
                        
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="gdo"
                    render={({field}) => (
                        <FormItem className='md:w-3/4 md:pr-2 '>
                           <FormLabel className='font-semibold text-base flex justify-between'>
                                GDO
                                <FormMessage />
                           </FormLabel>
                           <FormControl >
                                <Input type="text" {...field}   />
                           </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className='self-end w-1/4'  >
                    {btnTitle}
                </Button>
            </form>
        </Form>
    )
}

export default formPrae