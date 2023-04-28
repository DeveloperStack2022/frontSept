import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {validationSchemaInicioSession,FormInicioSessionType} from '@/schemas/form'
import {useNavigate } from 'react-router-dom'

// Components 
import AlertComponent from '@/components/alerts'

const SignIn = () => {
    // Hooks react-router-dom
    const navigate = useNavigate()
    
    const {register,handleSubmit,formState:{errors}} = useForm<FormInicioSessionType>({mode:'onBlur',resolver:yupResolver(validationSchemaInicioSession)});

    const handleSubmitForm = async (data:FormInicioSessionType) => {
       const res = await fetch('http://localhost:5050/api/login',{
        method:'POST',
        body:JSON.stringify({
            email:data.email,
            password:data.password
        }),
        headers:{
            'Content-Type':"Application/json"
        }
       })
       // -> dataResponse -> {accessToken: stringToken,name:stringNameUser}
       if(res.status >= 200 && res.status <= 299){
           const dataResponse = await res.json()
           window.localStorage.setItem('token',JSON.stringify(dataResponse))
           return navigate('/admin')
       }

    }

    return (
        <section className="w-1/2 md:w-[60%] bg-white rounded-md p-4">
            <div className="grid grid-cols-2">
                <div className="flex flex-col justify-between bg-gray-50 rounded-md p-4">
                   <h4 className="text-2xl text-gray-700 font-bold mb-4">Mini Sistema de ingreso de solicitudes de Septier</h4>

                   <div className="bg-blue-500 px-2 pt-4 pb-2 text-white rounded-md">
                    <h4 className='font-semibold'>Necesitas ayuda?</h4>
                    <p className='text-xs text-white/[.5] mb-2'>Revisa el video de demostracion, en caso que sea otro tema comunicate con el desarrollador.</p>
                    <button className="font-bold text-sm bg-white rounded-md px-8 py-2  text-blue-600 ">Contacto</button>
                   </div> 
                </div>
                {/* Box Form */}
                <div className="p-4">
                    <h4 className="text-2xl text-gray-700 font-bold mb-4">Inicio de session</h4>
                    <p className="text-gray-500 text-sm">Usa las credenciales dadas por el administrador.</p>
                    {/* TODO: Form */}
                    <form  className="mt-4" onSubmit={handleSubmit(handleSubmitForm)} >
                        <AlertComponent isOpen={false} onClose={() => {}} >
                            <div></div>
                        </AlertComponent>
                        <div className="mb-6">
                            <label htmlFor="" className="flex justify-between  items-center text-gray-500 text-sm mb-1">Email {errors.email?.message && <span className='text-red-500 text-sm'>*{errors.email?.message}*</span>}</label>
                            <input {...register('email')} className="w-full py-2 pr-7 pl-2 block rounded-sm  bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm"  type="email" autoComplete="off" placeholder="jhondoe@user.com" />
                        </div>
                        <div className="mb-4">
                        <label htmlFor="" className="flex justify-between  items-center text-gray-500 text-sm mb-1">Contraseña {errors.password?.message && <span className='text-red-500 text-sm'>*{errors.password?.message}*</span>}</label>
                            <input {...register('password')} className="w-full py-2 pr-7 pl-2 block rounded-sm  bg-gray-100 outline-offset-2 outline-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-sm"  type="password" autoComplete="off"  />
                        </div>
                        <button type='submit' className="bg-blue-500 text-white rounded-md px-4 py-2 md:w-full block mx-auto hover:bg-blue-600">Iniciar session</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignIn