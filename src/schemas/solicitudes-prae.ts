import * as yup from 'yup'

export type ValidationFormPrae = {
    numero_cl:string;
    unidad_req:string;
    agente_req:string;
    motivo:string;
    cedula:string;
    nombres_apellidos:string;
    placas:string;
    celular:string;
    telefono:string;
    empresa:string;
    direccion:string;
    gdo:string;
}

const validationPraeYup = yup.object().shape({
    numero_cl:yup.string().required('Campo Requerido').min(10,'Numero Icorrecto').max(10,'Numero Incorrecto'),
    unidad_req:yup.string().required('Campor Requerido'),
    agente_req:yup.string().required('Campor Requerido'),
    motivo:yup.string().required('Campor Requerido'),
    cedula:yup.string().required('Campor Requerido').min(10,'Numero Icorrecto').max(10,'Numero Incorrecto'),
    nombres_apellidos:yup.string().required('Campor Requerido'),
    placas:yup.string().test('placaEcuatoriana', 'Placa incorrecta', (value) => {
        // Si el campo está vacío, no se aplica la validación
        if (!value) {
            return true;
        }
        // Expresión regular para validar placas de carros ecuatorianas
        const ecuadorPlacaRegex = /^[A-Z]{3}-\d{3,4}$/;
        
        // Comprobar si el valor coincide con el patrón de placa ecuatoriana
        return ecuadorPlacaRegex.test(value);
    }),
    celular:yup.string().required('Campor Requerido').min(10,'Numero Icorrecto').max(10,'Numero Incorrecto'),
    telefono:yup.string().required('Campor Requerido'),
    empresa:yup.string().required('Campor Requerido'),
    direccion:yup.string().required('Campor Requerido'),
    gdo: yup.string().required('Campor Requerido')
})

export {
    validationPraeYup,
}