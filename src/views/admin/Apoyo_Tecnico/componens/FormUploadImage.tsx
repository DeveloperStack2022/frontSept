import {ClipboardEvent, useState,useEffect} from 'react'
import {UseFormRegister,Control,UseFormSetValue} from 'react-hook-form'
import { ValidationType } from "@/schemas/apoyo-tecnico";
type TypeValidationStateForm = Omit<ValidationType, "">;

interface IProps {
    register: UseFormRegister<TypeValidationStateForm>;
    control: Control<TypeValidationStateForm,any>
    setValue: UseFormSetValue<TypeValidationStateForm>
}

export default function UploadFile({setValue,control,register}:IProps){

    const [ImagePreview,setImagePreview] = useState< string | ArrayBuffer | null>()

    const handlePasteEvents = (e:ClipboardEvent) => {
        // const inputFile = document.querySelector<HTMLInputElement>('#input-file')!
        // inputFile.files = e.clipboardData.files
        if(e.clipboardData.files[0].type.startsWith("image/")){
            setValue('upload_anexo',e.clipboardData.files[0])
            preview(e.clipboardData.files[0])
        }
    }

    const preview = (file:Blob) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            setImagePreview(fileReader.result)
        }
    }   

    return (
        <div className='px-6'>
            {/* <input type="file"   {...register('upload_anexo')} id="input-file" className="hidden" /> */}
            <div  onPaste={handlePasteEvents} className="inline-flex h-80 w-full border border-dashed bg-gray-200">
                <img src={ImagePreview as string} alt="img-preview" />
            </div>
        </div>
    )
}