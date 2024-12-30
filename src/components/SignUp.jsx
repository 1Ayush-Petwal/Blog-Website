import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';
import { login } from '../store/authSlice';
import { Input, Button, Logo } from "./index"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    // Assuming data has {email, password, name} as an object then we can automaticaly break it down into by just passing the object 
    const create = async (data) => {
        try {

            //Remember always that the database is in another continent that is why we are supposed to wait for its response 

            //Also remember that it is not always that the response will always come as expected so we are supposed to exception proof it 
            const userData = await authService.createAccount(data);
            console.log(userData);
            if (userData) {
                const user = await authService.getCurrentUser()
                
                if (user) dispatch(login(user));
                console.log(user);
                navigate('/')
            }
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'
                >{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className='space-y-5'>
                        <Input
                            label="Name"
                            placeholder='Enter your name'
                            {...register('name', {
                                required: true,
                            })}>
                        </Input>
                        <Input
                            label='Email'
                            type='email'
                            placeholder="Enter your email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || "Enter a valid email address"
                                }
                            })}>
                        </Input>
                        <Input
                            label='Password'
                            type='password'
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true
                            })}>
                        </Input>

                        <Button type="submit"
                            className='w-full'
                        >Create Account</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default SignUp