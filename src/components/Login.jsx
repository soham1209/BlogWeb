import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo, Container } from "./index"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"
import bgimg from "../assets/background.svg"


function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        console.log("you are right")
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (

        <div
            className="flex items-center justify-center md:justify-start md:pl-15 min-h-screen bg-cover bg-center "
            style={{ backgroundImage: `url(${bgimg}) ` }}
        >
            <div className='flex items-center justify-center min-h-screen w-lg'>
                <div className='w-full max-w-[20rem] md:max-w-md  bg-clr1 rounded-xl p-10 shadow-[6px_6px_10px_0_rgba(0,0,0,0.4)]  '>
                    <div className="mb-2 ">
                        <span className="w-full flex justify-center">
                            <Logo ClassName='max-w-[200px] md:max-w-[300px]' width="100%"  />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl md:text-3xl text-clr5 font-bold leading-tight">Log In to your account</h2>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(login)} className='mt-8'>
                        <div className='space-y-5 flex flex-col items-center '>
                            <Input
                                label="Email:"
                                placeholder="Enter your email"
                                type="email"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                            "Email address must be a valid address",
                                    }
                                })}
                            />
                            <Input
                                label="Password: "
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: true,
                                })}
                            />
                            <Button
                                type="submit"
                                className="w-40 mt-8 sm:w-auto"
                            >LOGIN</Button>
                        </div>
                    </form>

                    <p className=" mt-2 text-center text-base text-clr5">
                        or<br />
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline">
                            <br />
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login