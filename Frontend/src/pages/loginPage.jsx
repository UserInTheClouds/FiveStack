import zustandStore from "../misc/zustand.utility"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

const Login = () => {

    const [firstLoad,setFirstLoad] = useState(false);
    const {setAuthUser} = zustandStore();
    const [password,setPassword] = useState('');
    const [otp,setOtp] = useState('');
    const [isOtpSent,setIsOtpSent] = useState('');
    const [email,setEmail] = useState('');
    const [errorMsg,setErrorMsg] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{setFirstLoad(true)},[]);

    const loginFunction = async (e) => {
        e.preventDefault();
        setErrorMsg(null);

        try {
            const response = await axios.post('/api/auth/login',{email,password},{withCredentials:true})
            setIsOtpSent(true);

        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Failed to login" );
        }
    }

    const verifyOtpFunction = async(e)=>{
        e.preventDefault();
        setErrorMsg(null);
        try {
            
            const response = await axios.post('/api/auth/verifyotp',{email,otp},{withCredentials:true});
            setAuthUser(response.data);
            navigate('/chat');

        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Failed to verify otp");
        }
    }

    return(
        <div className="bg-[url('./assets/bg6.jpg')] bg-cover bg-blend-multiply bg-black/70 bg-no-repeat text-white w-screen h-screen flex items-center justify-center relative ">
            <div className="absolute top-5 left-5">
                <button className="transition-all duration-200 opacity-50 hover:opacity-80 hover:cursor-pointer font-bold" onClick={()=>navigate('/')}>&lt; Back</button>
            </div>
            <div className={`md:bg-white/8 backdrop-blur-2xl w-full md:w-2/5  md:h-fit p-10 rounded-4xl relative shadow-xl shadow-black/50 border-1 border-white/10 transition-opacity duration-600 ease-out ${firstLoad?"opacity-100":"opacity-0"} `}>
                      {!isOtpSent ? (
                    <form onSubmit={loginFunction} >
                        <div className="mb-5 ">
                            <label className="block opacity-70 mb-2 ">Email</label>
                            <input type="email" value={email} required onChange={(e)=>setEmail(e.target.value)}
                            className="bg-gray-700/40 border-1 border-gray-300/10 rounded-md w-full h-10 px-1 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-white/25 transition-all duration-100 placeholder:opacity-30" placeholder="Email Address" />
                        </div>
                        <div className="mb-10">
                            <label className="block opacity-70 mb-2 ">Password</label>
                            <input type="password" value={password} required onChange={(e)=>setPassword(e.target.value)}
                            className="bg-gray-700/40 rounded-md w-full h-10 px-1 py-2 focus:outline-none focus:ring-1 focus:ring-white/25 transition-all duration-100 placeholder:opacity-30 " placeholder="Password" />
                            
                            {/* Forgot Password Link */}
                            <div className="flex justify-end mt-2">
                                <button type="button" onClick={() => navigate('/forgot-password')} className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors bg-transparent border-none p-0 cursor-pointer">
                                    Forgot Password?
                                </button>
                            </div>

                            {errorMsg && (
                            <div className="mt-1 text-red-400 text-sm">
                                {errorMsg}
                            </div>
                            )}
                        </div>
                        <button type="submit"
                         className="bg-gradient-to-r from-blue-500/90 to-cyan-500/90 hover:from-blue-500/85 hover:to-cyan-500/85 active:from-blue-500/80 active:to-cyan-500/80 transition-all duartion-75 border-gray- py-2 rounded-md hover:cursor-pointer w-full text-gray-200">
                            Log In
                        </button>
                    </form>
                ) : (
 <form onSubmit={verifyOtpFunction} >
                        <div className="mb-10 ">
                            <h2 className="text-xl font-bold mb-2">Verify Your Account</h2>
                            <label className="block opacity-70 mb-2 text-sm">Enter the code sent to {email}</label>
                            <input type="text" value={otp} required onChange={(e)=>setOtp(e.target.value)}
                            className="bg-gray-700/40 border-1 border-gray-300/10 rounded-md w-full h-10 px-1 py-2 text-gray-100 focus:outline-none focus:ring-1 focus:ring-white/25 transition-all duration-100 tracking-widest text-center text-lg placeholder:text-white/30" placeholder="123456" maxLength={6} />
                            
                            {errorMsg && (
                            <div className="mt-2 text-red-400 text-smtext-center">
                                {errorMsg}
                            </div>
                            )}
                        </div>
                        <button type="submit"
                         className="bg-gradient-to-r from-blue-500/90 to-cyan-500/90 hover:from-blue-500/85 hover:to-cyan-500/85 active:from-blue-500/80 active:to-cyan-500/80 transition-all duartion-75 border-gray- py-2 rounded-md hover:cursor-pointer w-full text-gray-200">
                            Verify
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Login