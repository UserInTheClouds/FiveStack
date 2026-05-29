import React, { useState, useEffect } from "react";
import zustandStore from "../misc/zustand.utility";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [firstLoad, setFirstLoad] = useState(false);
    const { setAuthUser } = zustandStore();
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState(null);

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const [isOtpSent, setIsOtpSent] = useState(false);

    useEffect(() => { setFirstLoad(true) }, []);

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setErrorMsg(null);

        try {
            await axios.post('/api/auth/forgot-password', { email }, { withCredentials: true });
            setIsOtpSent(true);
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Failed to send reset email");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setErrorMsg(null);

        try {
            const response = await axios.post(
                '/api/auth/reset-password',
                { email, otp, newPassword },
                { withCredentials: true }
            );

            setAuthUser(response.data);
            navigate('/chat');
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Failed to reset password");
        }
    };

    return (
        <div className="bg-[url('./assets/bg6.jpg')] bg-cover bg-blend-multiply bg-black/70 bg-no-repeat text-white w-screen h-screen flex items-center justify-center relative ">
            <div className="absolute top-5 left-5">
                <button className="transition-all duration-200 opacity-50 hover:opacity-80 hover:cursor-pointer font-bold" onClick={() => navigate('/login')}>&lt; Back</button>
            </div>
            
            <div className={`md:bg-white/8 backdrop-blur-2xl w-full md:w-2/5 md:h-fit p-10 rounded-4xl relative shadow-xl shadow-black/50 border-1 border-white/10 transition-opacity duration-600 ease-out ${firstLoad ? "opacity-100" : "opacity-0"} `}>
                
                {!isOtpSent ? (
                    <form onSubmit={handleRequestOtp}>
                        <div className="mb-10">
                            <h2 className="text-xl text-gray-400 mb-2">Reset Password</h2>
                            <label className="block text-gray-400 opacity-70 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                value={email} 
                                required 
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-700/40 border-1 border-gray-300/10 rounded-md w-full h-10 px-1 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-white/25 transition-all duration-100 placeholder:opacity-30" 
                                placeholder="Email Address" 
                            />
                            {errorMsg && <div className="mt-2 text-red-400 text-sm">{errorMsg}</div>}
                        </div>
                        <button type="submit" className="bg-gradient-to-r from-blue-500/90 to-cyan-500/90 hover:from-blue-500/85 hover:to-cyan-500/85 active:from-blue-500/80 active:to-cyan-500/80 transition-all duartion-75 py-2 rounded-md hover:cursor-pointer w-full text-gray-200">
                            Send Reset Code
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-10">
                            <h2 className="text-xl font-bold mb-2">Create New Password</h2>
                            <label className="block opacity-70 mb-2 text-sm mt-4">Code sent to {email}</label>
                            
                            <input 
                                type="text" 
                                value={otp} 
                                required 
                                onChange={(e) => setOtp(e.target.value)}
                                className="bg-gray-700/40 placeholder:text-gray-500 border-1 border-gray-300/10 rounded-md w-full h-10 px-1 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-white/25 transition-all duration-100 tracking-widest text-center text-lg mb-4" 
                                placeholder="123456" 
                                maxLength={6} 
                            />
                            
                            <label className="block opacity-70 mb-2 mt-4">New Password</label>
                            <input 
                                type="password" 
                                value={newPassword} 
                                required 
                                onChange={(e) => setNewPassword(e.target.value)}
                                minLength={8}
                                className="bg-gray-700/40 border-1 border-gray-300/10 rounded-md w-full h-10 px-1 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-white/25 transition-all duration-100 placeholder:opacity-30" 
                                placeholder="Minimum 8 characters required" 
                            />
                            
                            {errorMsg && <div className="mt-2 text-red-400 text-sm text-center">{errorMsg}</div>}
                        </div>
                        <button type="submit" className="bg-gradient-to-r from-blue-500/90 to-cyan-500/90 hover:from-blue-500/85 hover:to-cyan-500/85 active:from-blue-500/80 active:to-cyan-500/80 transition-all duartion-75 py-2 rounded-md hover:cursor-pointer w-full text-gray-200">
                            Reset and Login
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;