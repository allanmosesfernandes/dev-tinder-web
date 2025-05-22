import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginSchema } from '../utils/schema';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(loginSchema)
    });

// State
    const [loginError, setLoginError] = useState(null);
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        setLoginError('')
        axios.post('http://localhost:3000/login', {
            emailId: data.email,
            password: data.password
        }, {withCredentials: true})
        .then(function (response) {
            const userObject = response?.data[0]
            dispatch(addUser(userObject))
            navigate('/')
        })
        .catch((error) => {
            if (error.response) {
                setLoginError(error.response?.data?.error)
            }
            console.log(error);
        });
    }
    return (
        <div className='flex min-h-screen'>
            <form onSubmit={handleSubmit(onSubmit)} className="justify-center mx-auto h-min self-center">
                <div className="card card-border border-neutral bg-base-100 w-96 ">
                    <div className="card-body">
                        <h2 className="card-title mx-auto">Account</h2>
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
                          <input type="email" placeholder="mail@site.com" required {...register("email")} />
                        </label>
                        <div className="validator-hint hidden">Enter valid email address</div>
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
                            type="password"
                            required
                            placeholder="Password"
                            {...register("password")}
                            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                          />
                        </label>
                        <p className="validator-hint hidden">
                          Must be more than 8 characters, including
                          <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
                        </p>
                        {errors.password && (
                            <p role="alert" className="text-error text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                        {loginError && (
                            <p role="alert" className="text-error text-sm mt-1 text-center">{loginError}</p>
                        )}
                        <div className="card-actions justify-center">
                          <button className="btn btn-outline btn-secondary">Login</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login