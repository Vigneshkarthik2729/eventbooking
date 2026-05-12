import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // For now, just navigate to events on any credentials
        navigate('/events')
    }

    return (
        <div className="flex h-full w-full">

            <div className="w-full flex flex-col items-center justify-center">

                <form onSubmit={handleSubmit} className="md:w-96 w-80 flex flex-col items-center justify-center">
                    <h2 className="text-4xl text-gray-900 font-medium">Sign up</h2>
                    <p className="text-sm text-gray-500/90 mt-3">Create your account to get started</p>

                    {/* Google Signup */}
                    <button type="button" className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full">
                        <img src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" />
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-gray-300/90"></div>
                        <p className="w-full text-nowrap text-sm text-gray-500/90">or sign up with email</p>
                        <div className="w-full h-px bg-gray-300/90"></div>
                    </div>

                    {/* Name */}
                    <div className="flex items-center w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
                        <input type="text" placeholder="Full Name"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>

                    {/* Email */}
                    <div className="flex items-center mt-4 w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
                        <input type="email" placeholder="Email id"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    {/* Password */}
                    <div className="flex items-center mt-4 w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
                        <input type="password" placeholder="Password"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    {/* Confirm Password */}
                    <div className="flex items-center mt-4 w-full border border-gray-300/60 h-12 rounded-full pl-6 gap-2">
                        <input type="password" placeholder="Confirm Password"
                            className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>

                    {/* Terms */}
                    <div className="w-full flex items-center gap-2 mt-6 text-gray-500/80">
                        <input type="checkbox" className="h-4" required />
                        <p className="text-sm">I agree to the terms & conditions</p>
                    </div>

                    {/* Submit */}
                    <button type="submit"
                        className="mt-6 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                        Register
                    </button>

                    {/* Login Redirect */}
                    <p className="text-gray-500/90 text-sm mt-4">
                        Already have an account? 
                        <a className="text-indigo-400 hover:underline cursor-pointer ml-1" onClick={() => navigate('/login')}>Login</a>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Register