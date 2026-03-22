import { useState } from "react";
import zustandStore from "../misc/zustand.utility"
import axios from 'axios'

const Signup = () => {

    const {setAuthUser} = zustandStore();
    const [password,setPassword] = useState('');
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [errorMsg,setErrorMsg] = useState(null);

    const signupFunction = async (e) => {
        e.preventDefault();
        setErrorMsg(null);

        try {
            const response = await axios.post('/api/auth/signup',{email,password,username},{withCredentials:true})
            setAuthUser(response.data);

        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Failed to login" );
        }
    }

    return(
        
        <div className="bg-black text-white w-screen h-screen flex items-center justify-center">
            <div className="bg-stone-800 w-1/3 h-fit rounded-2xl px-10 py-10">
                <form onSubmit={signupFunction} >
                    <div className="mb-5">
                        <label className="block opacity mb-2 ">Email</label>
                        <input type="email" value={email} required onChange={(e)=>setEmail(e.target.value)}
                        className="bg-gray-700 rounded-sm w-full h-8 " />
                    </div>
                    <div className="mt-5">
                        <label className="block opacity mb-2 ">Username</label>
                        <input type="text" value={username} required onChange={(e)=>setUsername(e.target.value)}
                        className="bg-gray-700 rounded-sm w-full h-8 " />
                    </div>
                    <div className="mt-5">
                        <label className="block opacity mb-2 ">Password</label>
                        <input type="password" value={password} required onChange={(e)=>setPassword(e.target.value)}
                        className="bg-gray-700 rounded-sm w-full h-8 " />
                        {errorMsg && (
                        <div className="mt-1 text-red-400 text-sm">
                            {errorMsg}
                        </div>
                        )}
                    </div>
                    <button type="submit"
                     className="bg-green-400 mt-10 w-full h-8 mt-2 rounded-md hover:cursor-grab hover:bg-green-500">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>

    )
}

export default Signup