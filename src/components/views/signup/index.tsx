"use client"

import { cartContext } from '@/global/context';

import { useContext, useState } from 'react';


type SignupFormData = {
    fullName: string;
    email: string;
    password: string;
};

const SignupFormComp = () => {
    const first = useContext(cartContext)
    const [formData, setFormData] = useState<SignupFormData>({
        fullName: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSignup = () => {
        console.log(formData)
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">

            <div className="bg-slate-100 shadow-2xl border-t-8 border-pink-700 rounded px-4 md:px-8 pt-6 pb-8">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                        Full Name
                    </label>
                    <input
                        className={`appearance-none border border-purple-300 rounded w-full md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.fullName ? 'border-red-500' : ''
                            }`}
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                    />

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className={`appearance-none border border-purple-300 rounded w-full md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''
                            }`}
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                    />

                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className={`appearance-none border border-purple-300 rounded w-full md:w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''
                            }`}
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                    />
                </div>
                <div className="flex  justify-center items-center">
                    <button
                        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-5 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSignup}
                    >
                        SignUp
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupFormComp;