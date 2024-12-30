import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from '../services/auth';
import { login as authLogin } from '../store/authSlice'
import { Logo, Input, Button } from "./index"
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm(); // Note: 
    //1. The useForm hook is used to manage the state of the input fields of the form
    //2. It returns an object not an array
    //3. Both register and handleSubmit are moreover methods or events to be used to register and handle the input fields in the form 
    const [error, setError] = useState('')

    const login = async (data) => {
        setError(''); //At the start of a login session we should reset the errors to null

        try {
            const session = await authService.login(data);
            if (session) {
                // Now we have to store the data of the sesssioned user to the store

                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        }
        catch (error) {
            setError(error.message);
            alert(error.message);
        }
    }
    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                {/* //the handleSubmit is the event given by the useForm hook that helps in state management of the input fields of the form  */}
                <form onSubmit={handleSubmit(login)}
                    className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label='Email'
                            placeholder='Enter your Email'
                            type='email'
                            //Registering the component into the Form - Hook :  the ...register(key, Object {any extra options(req, validation)}) the key shoudl be unique as it helps the handleSubmit event to individually collect the data using these keys 
                            {...register('email', {
                                required: true,
                                // For highlighting the Email address of a person we use matchpattern
                                validate: {
                                    matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) ||
                                        "Enter an email address that is valid"
                                }
                            })}>
                        </Input>
                        <Input
                            label='password'
                            placeholder='Enter your password'
                            type='password'
                            {...register('password', {
                                required: true
                            })}>
                        </Input>
                        <Button type='submit'
                            className='w-full'
                        >Sign IN</Button>
                    </div>

                </form>

            </div>
        </div>
    )
}

export default Login