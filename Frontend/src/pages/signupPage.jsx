import { useState, useEffect } from "react";
import zustandStore from "../misc/zustand.utility"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [firstLoad, setFirstLoad] = useState(false);
    const { setAuthUser } = zustandStore();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [username, setUsername] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();
    useEffect(() => { setFirstLoad(true) }, []);

    const signupFunction = async (e) => {
        e.preventDefault();
        setErrorMsg(null);

        try {
            const response = await axios.post('/api/auth/signup', { email, password, username }, { withCredentials: true })
            setIsOtpSent(true);

        } catch (error) {
            console.log("Error in signupPage, axios post to signup, ", error);
            setErrorMsg(error.response?.data?.message || "Failed to signup");
        }
    }

    const verifyOtpFunction = async (e) => {
        e.preventDefault();
        setErrorMsg(null);

        try {
            const response = await axios.post('/api/auth/verifyotp', { email, otp }, { withCredentials: true });
            setAuthUser(response.data);
            navigate('/chat');
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Failed to verify OTP");
        }
    }

    return (

        <div className="relative bg-[#0B0F19] min-h-screen w-full text-white flex items-center justify-center overflow-x-hidden">

            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] md:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

            <div className="absolute top-5 left-5 z-10">
                <button className="transition-all duration-200 opacity-50 hover:opacity-80 hover:cursor-pointer font-bold" onClick={() => navigate('/')}>&lt; Back</button>
            </div>
            <div className={`md:bg-[#111827]/80 backdrop-blur-2xl w-full md:w-2/5 md:h-fit p-10 rounded-4xl relative z-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/5 transition-opacity duration-600 ease-out ${firstLoad ? "opacity-100" : "opacity-0"} `}>
                {!isOtpSent ? (
                    <form onSubmit={signupFunction} >
                        <div className="mb-5">
                            <label className="block opacity-70 mb-2  ">Email</label>
                            <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-700/40 border-1 border-gray-300/10 rounded-md w-full h-10 px-1 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-white/25 transition-all duration-100 placeholder:opacity-30" placeholder="Email Address" />
                        </div>
                        <div className="mt-5">
                            <label className="block opacity-70 mb-2  ">Username</label>
                            <input type="text" value={username} required onChange={(e) => setUsername(e.target.value)}
                                className="bg-gray-700/40 border-1 border-gray-300/10 rounded-md w-full h-10 px-1 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-white/25 transition-all duration-100 placeholder:opacity-30" placeholder="Username" />
                        </div>
                        <div className="mt-5">
                            <label className="block opacity-70 mb-2  ">Password</label>
                            <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)}
                                className="bg-gray-700/40 border-1 border-gray-300/10 rounded-md w-full h-10 px-1 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-white/25 transition-all duration-100 placeholder:opacity-30" placeholder="Password" />
                            {errorMsg && (
                                <div className="mt-1 text-red-400 text-sm">
                                    {errorMsg}
                                </div>
                            )}
                        </div>
                        <button type="submit"
                            className=" mt-12 bg-gradient-to-r from-green-500/90 to-emerald-500/90 hover:from-green-500/85 hover:to-emerald-500/85 active:from-green-500/80 active:to-emerald-500/80 transition-all duartion-75 border-gray- py-2 rounded-md hover:cursor-pointer w-full text-gray-200">
                            Sign Up
                        </button>
                    </form>
                ) : (
                    <form onSubmit={verifyOtpFunction} >
                        <div className="mb-10 ">
                            <h2 className="text-xl font-bold mb-2">Verify Your Account</h2>
                            <label className="block opacity-70 mb-2 text-sm">Enter the code sent to {email}</label>
                            <input type="text" value={otp} required onChange={(e) => setOtp(e.target.value)}
                                className="bg-gray-700/40 border-1 border-gray-300/10 rounded-md w-full h-10 px-1 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-white/25 transition-all duration-100 tracking-widest text-center text-lg placeholder:text-white/30" placeholder="123456" maxLength={6} />

                            {errorMsg && (
                                <div className="mt-2 text-red-400 text-sm text-center">
                                    {errorMsg}
                                </div>
                            )}
                        </div>
                        <button type="submit"
                            className=" mt-2 bg-gradient-to-r from-green-500/90 to-emerald-500/90 hover:from-green-500/85 hover:to-emerald-500/85 active:from-green-500/80 active:to-emerald-500/80 transition-all duartion-75 border-gray- py-2 rounded-md hover:cursor-pointer w-full text-gray-200">
                            Verify
                        </button>
                    </form>
                )}
            </div>
        </div>

    )
}

export default Signup