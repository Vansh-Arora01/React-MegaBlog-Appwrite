// import React, { useState } from 'react';
// import authservice from '../appwrite/auth';
// import { Link, useNavigate } from 'react-router-dom';
// import { login } from '../store/authSlice';
// import { Button, Input, Logo } from './index.js'
// import { useDispatch } from 'react-redux';
// import { useForm } from 'react-hook-form';



// function SignUp() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const [error, setError] = useState("")
//     const { register, handleSubmit } = useForm()


//     const create = async (data)=>{
//         setError("")
//         try {
//             const userData = await authservice.createAccount(data)
//             if (userData) {
//                 await authservice.getCurrentUser()
//                 if (userData) dispatch(login(userData));
//                 navigate("/")
//             }

//         } catch (error) {
//             setError(error.message)

//         }
//     }

//     return (
//         <div className="flex items-center justify-center">
//             <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//                 <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//                 </div>
//                 <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
//                 <p className="mt-2 text-center text-base text-black/60">
//                     Already have an account?&nbsp;
//                     <Link
//                         to="/login"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign In
//                     </Link>
//                 </p>
//                 {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//                 <form onSubmit={handleSubmit(create)}>
//                     <div className='space-y-5'>
//                         <Input
//                             label="FullName : "
//                             placeholder="Enter Your Full name "
//                             {...register("name", {
//                                 required: true,
//                             })}


//                         />
//                         <Input
//                             label="Email: "
//                             placeholder="Enter your email"
//                             type="email"
//                             {...register("email", {
//                                 required: true,
//                                 validate: {
//                                     matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                         "Email address must be a valid address",
//                                 }
//                             })}
//                         />
//                         <Input
//                         label="Password: "
//                         type="password"
//                         placeholder="Enter your Password "
//                         {...register("password",{
//                             required : true,
//                         })}
//                         />
//                         <Button
//                         type="submit"
//                         className="w-full"
//                         > 
//                             Create Account 
//                         </Button>
                       
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default SignUp

import React, { useState } from 'react';
import authservice from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index.js';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const create = async (data) => {
        setError("");
        try {
            const userData = await authservice.createAccount(data);
            if (userData) {
                await authservice.getCurrentUser();
                dispatch(login(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="
            min-h-screen flex items-center justify-center px-4
            bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100
        ">
            <div className="
                relative w-full max-w-lg p-10
                bg-white rounded-2xl
                shadow-2xl
                border border-indigo-100
                overflow-hidden
            ">

                {/* Decorative top strip */}
                <div className="absolute inset-x-0 top-0 h-1.5
                                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                {/* Logo */}
                <div className="mb-6 flex justify-center">
                    <div className="w-24">
                        <Logo width="100%" />
                    </div>
                </div>

                {/* Heading */}
                <h2 className="
                    text-center text-3xl font-extrabold
                    bg-gradient-to-r from-indigo-600 to-purple-600
                    bg-clip-text text-transparent
                ">
                    Create your account
                </h2>

                <p className="mt-2 text-center text-gray-500">
                    Join us and start publishing 🚀
                </p>

                {/* Login link */}
                <p className="mt-3 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-indigo-600 hover:text-purple-600 transition"
                    >
                        Sign In
                    </Link>
                </p>

                {/* Error */}
                {error && (
                    <div className="mt-6 rounded-lg bg-red-50 border border-red-200 p-3 text-center">
                        <p className="text-sm text-red-600 font-medium">
                            {error}
                        </p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(create)} className="mt-8 space-y-5">
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        className="focus-within:ring-2 focus-within:ring-indigo-400 rounded-lg"
                        {...register("name", { required: true })}
                    />

                    <Input
                        label="Email"
                        placeholder="you@example.com"
                        type="email"
                        className="focus-within:ring-2 focus-within:ring-purple-400 rounded-lg"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be valid",
                            },
                        })}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        className="focus-within:ring-2 focus-within:ring-pink-400 rounded-lg"
                        {...register("password", { required: true })}
                    />

                    <Button
                        type="submit"
                        className="
                            w-full py-2.5 text-lg font-semibold text-white
                            bg-gradient-to-r from-indigo-600 to-purple-600
                            hover:from-indigo-700 hover:to-purple-700
                            transition-all duration-300
                            shadow-lg hover:shadow-xl
                        "
                    >
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
