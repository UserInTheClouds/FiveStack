import { useNavigate } from "react-router-dom"

const Landing = () => {

    const navigate = useNavigate();

    return(
        <div className="bg-[url('./assets/bg6.jpg')] bg-cover bg-black/40 bg-blend-multiply h-screen w-screen text-white">
            <header className="w-screen h-18 relative flex items-center">
                <span className="absolute left-12 hover:cursor-pointer font-['Anton','sans-serif'] scale-x-175 scale-y-150 bg-gradient-to-r from-gray-200 to-cyan-300 bg-clip-text text-transparent">
                    Five<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Stack</span>
                </span>
                <button className="right-40 absolute bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-md px-5 py-1 font-bold hover:from-cyan-500 hover:to-blue-600 active:from-cyan-400 active:to-blue-500 hover:cursor-pointer" onClick={()=>navigate('/signup')}>
                    Sign Up
                </button>
                <button className="right-10 absolute bg-white text-black rounded-md px-5 py-1 font-bold hover:bg-gray-200 hover:cursor-pointer active:bg-white" onClick={()=>navigate('/login')}>
                    Log In
                </button>
            </header>

            <div className="p-5 justify-center text-center items-center flex mt-30">
                <div className="">
                <span className="font-extrabold font-sans text-7xl leading-18 block">
                    <span className="">CONNECT WITH FRIENDS</span> <br />
                    <span className="">COLLABORATE AS TEAMS</span>
                </span>
                <button className="mt-7 font-bold text-md bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md px-5 py-2 hover:from-cyan-500 hover:to-blue-600 active:from-cyan-400 active:to-blue-500 hover:cursor-pointer active:bg-white " onClick={()=>navigate('/signup')} >Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default Landing