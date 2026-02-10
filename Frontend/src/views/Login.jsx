import { Navigate, useNavigate } from "react-router-dom"

const Login = () => {
    const navi = useNavigate();
    return(
        <div className="min-h-screen min-w-full bg-gradient-to-tl from-sky-950 to-black relative flex items-center justify-center">
            <button onClick={()=> navi("/")} className="invert hover:cursor-grab fixed top-3 left-3 w-10 mt-5 ml-2"> <img src="https://img.icons8.com/?size=100&id=40217&format=png&color=000000" alt="" /></button>
            <div className="grid gap-y-10 bg-slate-800 text-white pt-10 pb-10 pl-10 pr-10 rounded-md">
                <input type="text" placeholder="Email Address or Username" className="placeholder:text-slate-400 bg-slate-600 border-1 border-slate-500 py-2 px-3 w-2xl rounded-4xl focus:outline-slate-400 focus:outline-1" />
                <input type="text" placeholder="Password" className="placeholder:text-gray-400 bg-slate-600 border-1 border-slate-500 py-2 px-3 w-2xl rounded-4xl focus:outline-slate-400 focus:outline-1 " />
                <button className="bg-gradient-to-r from-red-500 to-orange-400 hover:cursor-grab rounded-4xl py-2 w-1/5 hover:shadow-[1px_1px_5px_rgba(0,0,0,0.2)] hover:shadow-red-400 transition-all duration-200">Log In</button>
            </div>
        </div>
    )
}

export default Login