import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";

const initialValues = {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
};

const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es obligatorio"),
    apellido: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string().email("Formato inválido").required("El email es obligatorio"),
    telefono: Yup.string()
        .min(8, "Mínimo 8 dígitos")
        .max(15, "Máximo 15 dígitos")
        .required("El teléfono es obligatorio"),
});

const useShoppingCart = () => {
    const [ isSubmitted, setIsSubmitted ] = useState(false);

    const formik = useFormik({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            console.log("Compra confirmada:", values);
            formik.resetForm();
            setIsSubmitted(true);
        },
    });

    const isSubmitDisabled = () => {
        return isSubmitted || !formik.isValid || !formik.dirty;
    };

    return { formik, isSubmitDisabled, isSubmitted };
};

export default useShoppingCart;