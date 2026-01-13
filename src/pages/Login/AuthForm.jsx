import React from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../State'; // keep if you dispatch login result
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';


let registerSchema = object({
    firstName: string().required('required'),
    lastName: string().required('required'),
    email: string().email("invalid email").required('required'),
    password: string().required('required'),
    location: string().required('required'),
    occupation: string().required('required'),
    picture: string().required('required'),
})

let loginSchema = object({
    email: string().email("invalid email").required('required'),
    password: string().required('required'),
})

const initialValueRegister={
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValueLogin={
    email: "",
    password: "",
}



export default function AuthForm ({ type='login', children }) {
    const isLogin = type === 'login';
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const register = async(values,onSubmitProps)=>{
    // using the form data received from the forms
    const formData = new FormData();
    for(let value in values){
        formData.append(value,values[value])//append the formData 
    }
    formData.append('picturePath',values.picture.name);//appending the image manually
    
    const savedUserResponse = await fetch(//fetch call
        "http://localhost:3000/auth/register",{
            method: "POST",
            body: formData
        }
    )
    const savedUser = await savedUserResponse.json()
    onSubmitProps.resetForm()
    if (savedUser?.success) {
        navigate('/');
    }

}

    const login = async(values,onSubmitProps)=>{
        
        const loggedInResponse = await fetch(//fetch call
            "http://localhost:3000/auth/login",{
                method: "POST",
                body: JSON.stringify(values),
                headers: {"Content-Type":"application/json"}
            }
        )
        const loggedIn = await loggedInResponse.json()
        onSubmitProps.resetForm()
        if (loggedIn?.user && loggedIn?.token) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            navigate("/home"); // ✅ NOW this will work
        } 
    }

    const handleFormSubmit = async (values, onSubmitProps) => {
        if (isLogin) {
            await login(values, onSubmitProps);
        }
        else {
            await register(values, onSubmitProps);
        }
    };
    return (
    <Formik 
        onSubmit={handleFormSubmit} 
        initialValues={isLogin ? initialValueLogin : initialValueRegister}
        validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {(formikProps) => children(formikProps) }
    </Formik>
    )
}
