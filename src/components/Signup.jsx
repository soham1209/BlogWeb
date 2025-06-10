import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import bgimg from "../assets/background.svg"

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (


        <div
            className="flex items-start justify-center md:justify-start md:pl-15 min-h-screen bg-cover bg-center "
            style={{ backgroundImage: `url(${bgimg}) 
            ` }}
        >
            <div className='flex items-center justify-center min-h-screen w-lg'>
                <div className='w-full max-w-[20rem] md:max-w-md  bg-clr1 rounded-xl p-10 shadow-[6px_6px_10px_0_rgba(0,0,0,0.4)]  '>
                    <div className="mb-2 ">
                        <span className="w-full flex justify-center">
                            <Logo ClassName='max-w-[200px] md:max-w-[300px]' width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl md:text-3xl text-clr5 font-bold leading-tight">Sign up to create account</h2>
                    {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                    <form onSubmit={handleSubmit(create)} className='mt-8'>
                        <div className='space-y-5 flex flex-col items-center '>
                            <Input
                                label="Full Name: "
                                placeholder="Enter your full name"
                                {...register("name", {
                                    required: true,
                                })}
                            />
                            <Input
                                label="Email: "
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
                            > Create Account</Button>
                        </div>
                    </form>

                    <p className=" mt-2 text-center text-base text-clr5">
                        or<br />
                       Already have an account?&nbsp;
                        <Link
                            to="/login"
                            className="font-medium text-primary transition-all duration-200 hover:underline">
                            <br />
                            LogIn
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )







    // <div className="flex items-center justify-center">
    // <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
    // <div className="mb-2 flex justify-center">
    //         <span className="inline-block w-full max-w-[100px]">
    //             <Logo width="100%" />
    //         </span>
    //             </div>
    //             <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
    //             <p className="mt-2 text-center text-base text-black/60">
    //                 Already have an account?&nbsp;
    //                 <Link
    //                     to="/login"
    //                     className="font-medium text-primary transition-all duration-200 hover:underline"
    //                 >
    //                     Sign In
    //                 </Link>
    //             </p>
    //             {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

    //             <form onSubmit={handleSubmit(create)}>
    //                 <div className='space-y-5'>
    //                     <Input
    //                     label="Full Name: "
    //                     placeholder="Enter your full name"
    //                     {...register("name", {
    //                         required: true,
    //                     })}
    //                     />
    //                     <Input
    //                     label="Email: "
    //                     placeholder="Enter your email"
    //                     type="email"
    //                     {...register("email", {
    //                         required: true,
    //                         validate: {
    //                             matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
    //                             "Email address must be a valid address",
    //                         }
    //                     })}
    //                     />
    //                     <Input
    //                     label="Password: "
    //                     type="password"
    //                     placeholder="Enter your password"
    //                     {...register("password", {
    //                         required: true,})}
    //                     />
    //                     <Button type="submit" className="w-full">
    //                         Create Account
    //                     </Button>
    //                 </div>
    //             </form>
    //         </div>

    // </div>
    //   )
}

export default Signup