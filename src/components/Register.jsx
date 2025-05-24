import { useForm } from "react-hook-form";
import { signUpSchema } from "../utils/schema";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema)
    });

    // State
    const [loginError, setLoginError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [accountCreation, setAccountCreation] = useState(false);

    const onSubmit = async (data) => {
        setLoginError('');
        const { emailId, password, firstName, lastName } = data;

        axios.post('http://localhost:3000/signup', {
            emailId,
            password,
            firstName,
            lastName
        }, {withCredentials: true})
        .then(function (response) {
            setAccountCreation(true);
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response)
                setLoginError(error.response?.data?.message)
            }
            console.log(error);
        });
    }

    return (
        <div className="flex min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="card-border justify-center mx-auto h-min self-center bg-base-100 w-96 shadow-sm flex flex-col">
                {accountCreation
                    ?<div className="flex flex-col">
                        <div role="alert" className="alert alert-success">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="flex flex-col text-center">
                                <span>Your account has been confirmed!</span>
                                <span><Link className="link" to='/login'>Click here to login</Link></span>
                            </div>
                        </div>
                    </div>
                    :<div className="card card-border items-center text-center border-secondary p-6 gap-4">
                        <h2 className="card-title">Sign up</h2>
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input
                                type="text"
                                required
                                placeholder="First name"
                                minlength="2"
                                maxlength="20"
                                {...register("firstName")}
                            />
                        </label>
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                >
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                                </g>
                            </svg>
                            <input
                                type="text"
                                required
                                placeholder="Last name"
                                minlength="3"
                                maxlength="20"
                                {...register("lastName")}
                            />
                        </label>
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                >
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </g>
                            </svg>
                            <input type="email" placeholder="mail@site.com" required {...register("emailId")} />
                        </label>
                        {errors.email && (
                            <p role="alert" className="text-error text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                        <label className="input validator">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                                >
                                <path
                                    d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                                ></path>
                                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                                </g>
                            </svg>
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                placeholder="Password"
                                {...register("password")}
                            />
                            {showPassword ?
                                <svg onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-[1em] opacity-50">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                :
                                <svg onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-[1em] opacity-50">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>}

                        </label>
                        {errors.password && (
                            <p role="alert" className="text-error text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                        {loginError && (<p role="alert" className="text-error text-sm font-bold mt-1 text-center">{loginError}</p>)}
                        <div className="card-actions">
                            <button className="btn btn-primary" type="submit">Register</button>
                        </div>
                        <div className='flex flex-col my-4 gap-2 items-center'>
                            Already have an account?<Link className="link link-primary" to={'/login'}>Login</Link>
                        </div>
                    </div>}
            </form>
        </div>
    )
}

export default Register