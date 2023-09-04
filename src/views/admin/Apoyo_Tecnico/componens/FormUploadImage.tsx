import {Controller,UseFormRegister,Control} from 'react-hook-form'
import { ValidationType } from "@/schemas/apoyo-tecnico";
type TypeValidationStateForm = Omit<ValidationType, "">;

interface IProps {
    register: UseFormRegister<TypeValidationStateForm>;
    control: Control<TypeValidationStateForm,any>

}

export default function UploadFile({control,register}:IProps){
    return (
        <>
            {/* <Controller 
                name='upload_anexo'
                control={control}
                render={({field:{onChange,value,...field},fieldState,formState}) => (
                    <input  {...field} type={'file'} value={value}  onChange={(event) => onChange(event.target.files)} />
                )}
            /> */}
            <input type="file" {...register('upload_anexo')} />
        </>
    )
}