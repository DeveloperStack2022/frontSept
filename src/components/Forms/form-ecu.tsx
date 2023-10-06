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

import {useForm} from 'react-hook-form'
import {FormField,Form,FormControl,FormItem,FormLabel,FormMessage} from '@/components/ui/form'
import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'

// YUP: Validation
import {yupResolver} from '@hookform/resolvers/yup'
import {SolicitudesEcu} from '@/schemas/solicitudes-ecu'
// import {} from 

interface Props {
    btnTitle:string;
}

// COMPONENT: 

const formEcu = ({btnTitle}:Props) => {

    const form = useForm();

    return (
        <Form {...form}>
            <form className='flex flex-wrap bg-white p-4 rounded-md md:w-1/2'>
                <div className="md:w-1/2 pr-2">
                    <h4 className='font-semibold'>Datos Agente Requirente</h4>
                    <FormField 
                        control={form.control}
                        name=''
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
                        name=''
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
                        name=''
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
                        name=''
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
                        name=''
                        render={({field}) => (
                            <FormItem className=''>
                                <FormLabel className=''>
                                    Numero Celular
                                    <FormMessage />
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        name=''
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className=''>
                                    Numero Celular
                                    <FormMessage />
                                </FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField 
                        name=''
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
                        name=''
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
                </div>
                <h4 className='w-full font-semibold'>Datos del Delito</h4>
                <FormField 
                    name=''
                    render={({field}) => (
                        <FormItem className='md:w-1/2 pr-2'>
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
                <div className="flex justify-between md:w-1/2">
                    <FormField 
                        name=''
                        render={({field}) => (
                            <FormItem className='md:w-2/3 pr-2'>
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
                    <Button type="submit" className='self-end w-1/3'>{btnTitle}</Button>
                </div>
            </form>
        </Form>
    )
}

export default formEcu