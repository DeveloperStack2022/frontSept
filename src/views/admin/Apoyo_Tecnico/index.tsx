// REACT: Hooks React 
import { useState,useRef } from "react";
// REACT-HOOKS-FORM: 
import { useForm, useFieldArray,Controller } from "react-hook-form";
import {addApoyoTecnico} from '@/services/apoyo-tecnico-services'
import ToastProvider from '@/components/toast/toastProvider'

// Components
import StepComponent from "./componens/step";
import Card from "@/components/card";
// Components Form
import FormDatosGenerales from "./componens/datosGenerales";
import FormDetenidos from "./componens/Detenidos";
import ResumenCaso from "./componens/ResumenCaso";
import FormArmas from "./componens/FormArmas";
import FormMuniciones from "./componens/FormMuniciones";
import FormDinero from "./componens/FormDinero";
import DetalisFinally from "./componens/DetalisFinally";
import FormVehiculo from "./componens/FormVehiculo";
import FormSustanciaFiscalizacion from './componens/FormSustanciasSujetasFiscalizacion'
import FormCelularesComponent from './componens/FormCelulares'
import FormAnaexos from './componens/FormUploadImage'
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationSchema, { ValidationType } from "@/schemas/apoyo-tecnico";
import { useToast } from "@/components/toast/toastProvider";

// TODO: Store Redux 
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {save_data} from '@/store/features/apoyo-tecnico'

// FIXME:
type TypeValidationStateForm = Omit<ValidationType, "">;

//TODO: Array Data
const DatosSepts:{numero:number,title:string}[] = [
  {
    numero: 1,
    title: "Datos Generales",
  },
  {
    numero: 2,
    title: "Resumen Caso",
  },
  {
    numero: 3,
    title: "Detenidos",
  },
  {
    numero: 4,
    title: "Celulares",
  },
  {
    numero:5,
    title:'Sustancias Sujetas A Fiscalizacion'
  },
  {
    numero: 6,
    title: "Armas",
  },
  {
    numero: 7,
    title: "Municiones",
  },
  {
    numero: 8,
    title: "Dinero",
  },
  {
    numero: 9,
    title: "Vehiculos",
  },
  {
    numero: 10,
    title: "Upload Anexos",
  },
  {
    numero: 11,
    title: "Presentacion",
  },
];

// TODO: ======== Component =========
const Steps = () => {
  // TODO: Toast
  const toast = useToast()
  // REDUX 
  const dispatch = useAppDispatch()
  const apoyo_tecnico = useAppSelector(data => data.apoyoTecnico)

  // TODO: Refs 
  const refSubmit = useRef<HTMLButtonElement>(null)

  // REACT-HOOKS-FORM: 
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
    setValue,
    trigger,
  } = useForm<TypeValidationStateForm>({
    resolver: yupResolver(ValidationSchema),
    mode: "onBlur",
  });
  //   field Array of Detenidos
  const {
    fields: FieldsDetenidos,
    append: AgregarDetenidos,
    remove: RemoveDetenidos,
  } = useFieldArray<TypeValidationStateForm, "detenidos">({
    control,
    name: "detenidos",
  });

  const {
    fields: FieldsCelulares,
    append: AgregarCelulares,
    remove: RemoveCelulares,
  } = useFieldArray<TypeValidationStateForm, "celulares">({
    control,
    name: "celulares",
  });
  //   field Array of Municiones
  const {
    fields: FieldsMuniciones,
    append: AgregarMuniciones,
    remove: RemoveMuniciones,
  } = useFieldArray<TypeValidationStateForm, "municiones">({
    control,
    name: "municiones",
  });

  //   Field Array with Armas:
  const {
    fields: FieldArmas,
    append: AgregarArmas,
    remove: RemoveArmas,
  } = useFieldArray<TypeValidationStateForm, "armas">({
    control,
    name: "armas",
  });
  //   Field Array for Vehiculos
  const {
    fields: FieldVehiculos,
    append: AgregarVehiculos,
    remove: RemoveVehiculos,
  } = useFieldArray<TypeValidationStateForm, "vehiculo">({
    control,
    name: "vehiculo",
  });
  //   field Array for Dinero
  const {
    fields: FieldDinero,
    append: AgregarDinero,
    remove: RemoveDinero,
  } = useFieldArray<TypeValidationStateForm, "dinero">({
    control,
    name: "dinero",
  });
  //   field Array for Dinero
  const {
    fields: FieldDrogas,
    append: AgregarDrogas,
    remove: RemoveDrogas,
  } = useFieldArray<TypeValidationStateForm, "sustancias_sujetas_fiscalizacion">({
    control,
    name: "sustancias_sujetas_fiscalizacion",
  });

  // State
  const [StepNumber, updateStepNumber] = useState<number>(1);
  const [TitleSteps, setTitleSteps] = useState([
    "Datos Generales",
    "Resumen Caso",
    "Detenidos",
    "Medios Electronicos",
    "Sustancias Sujetas a F",
    "Armas",
    "Municiones",
    "Dinero",
    "Vehiculo",
    "Upload Anexos",
    "Presentacion",
  ]);
  // Events
  const handleIncrement = () => updateStepNumber((prev) => prev + 1);
  const handleDecrement = () => updateStepNumber((prev) => prev - 1);

  // TODO:Components Render
  const ComponentsRender = (value: number) => {
    switch (value) {
      case 1:
        return <FormDatosGenerales  control={control} register={register} />;
      case 2:
        return <ResumenCaso register={register} />;
      case 3:
        return (
          <FormDetenidos
            register={register}
            fields={FieldsDetenidos}
            append={AgregarDetenidos}
          />
        );
      case 4:
        return <FormCelularesComponent append={AgregarCelulares} fields={FieldsCelulares} register={register} />
      case 5:
        return <FormSustanciaFiscalizacion append={AgregarDrogas} fields={FieldDrogas} register={register} />
      case 6:
        return (
          <FormArmas
            register={register}
            fields={FieldArmas}
            append={AgregarArmas}
          />
        );
      case 7:
        return (
          <FormMuniciones
            register={register}
            fields={FieldsMuniciones}
            append={AgregarMuniciones}
          />
        );
      case 8:
        return (
          <FormDinero
            register={register}
            fields={FieldDinero}
            append={AgregarDinero}
          />
        );
      case 9:
        return (
          <FormVehiculo
            register={register}
            fields={FieldVehiculos}
            append={AgregarVehiculos}
          />
        );
      case 10:
        return (
          <FormAnaexos control={control} register={register} />
        )
      case 11:
        return <DetalisFinally />;
    }
  };


  const submitForm = (data:any) => {
    const upload_anexo = data.upload_anexo[0]
    dispatch(save_data({...data,upload_anexo:upload_anexo}))
  }

  const hancleClickSubmit = ( ) => {
    refSubmit.current?.click()
    handleIncrement()
  }
  const handleSubmitFinally = async () => {
    console.log('Submit') 
    // await axios.post('',{})
    if(!!apoyo_tecnico?.data) {
      const data = await addApoyoTecnico(apoyo_tecnico?.data)
      if(data?.status  >= 200 && data?.status < 300 ) {
        toast?.pushSuccess('Agregado Exitosamente',3000,'truncate-1-lines')
      }
    }
  }

  console.log(errors)
  return (
    <ToastProvider variant='bottom_middle' >
      <Card extra={`w-full min-h-[487px] ${DatosSepts.length == StepNumber ? 'md:w-2/2' : 'md:w-1/2'} `}>
        <div className="flex  justify-center p-4">
          <StepComponent steps={DatosSepts} number_active={StepNumber} />
        </div>
        {/* Title Forms */}
        <h2 className="mx-2 text-center text-2xl font-bold text-gray-700">
          {TitleSteps[StepNumber - 1]}
        </h2>
        <form onSubmit={handleSubmit(submitForm)}>
          {ComponentsRender(StepNumber)}
          <button className="hidden " type="submit" ref={refSubmit} />
        </form>
        <div className=" flex h-full items-end justify-center pb-2">
          <div className="flex gap-x-2">
            <button
              className={`rounded px-4 py-2 font-bold text-white ${
                StepNumber != 1 ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-300"
              }`}
              onClick={handleDecrement}
              disabled={StepNumber == 1}
            >
              Regresar
            </button>
            {DatosSepts.length  == (StepNumber + 1) ? (
              <button className="rounded px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-600" onClick={hancleClickSubmit}>Presentacion
              </button>
            ) : DatosSepts.length == StepNumber ? (
              <button className="rounded px-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-600" onClick={handleSubmitFinally}>Submit
              </button>
            ):(
              <button
                className={`rounded px-4 py-2 font-bold text-white ${
                  DatosSepts.length == StepNumber
                    ? "bg-gray-300"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                onClick={handleIncrement}
                disabled={DatosSepts.length == StepNumber}
              >
                Siguiente
              </button>
            )}
          </div>
        </div>
      </Card>
    </ToastProvider>
  );
};
export default Steps;
