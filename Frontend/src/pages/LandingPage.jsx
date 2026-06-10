import { useNavigate } from "react-router-dom"

const Landing = () => {

    const navigate = useNavigate();

    return (
        <div className="relative bg-gray-950/95 min-h-screen w-full text-white flex flex-col">

            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] md:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>

            <header className="w-full h-18 relative flex items-center opacity-92 shrink-0 z-10">
                <span className="absolute left-12 hover:cursor-pointer font-['Anton','sans-serif'] scale-x-175 scale-y-150 bg-gradient-to-r from-gray-200 to-cyan-300 bg-clip-text text-transparent">
                    Five<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Stack</span>
                </span>
                <button className="right-40 absolute bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-md px-5 py-1 font-bold hover:from-cyan-500 hover:to-blue-600 active:from-cyan-400 active:to-blue-500 hover:cursor-pointer" onClick={() => navigate('/signup')}>
                    Sign Up
                </button>
                <button className="right-10 absolute bg-white text-black rounded-md px-5 py-1 font-bold hover:bg-gray-200 hover:cursor-pointer active:bg-white" onClick={() => navigate('/login')}>
                    Log In
                </button>
            </header>

            <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between flex-grow mt-20 px-4 md:px-10 lg:px-20 w-full max-w-[1400px] mx-auto gap-12">
                <div className="p-5 justify-center text-center lg:text-left items-center lg:items-start flex flex-col opacity-95 max-w-2xl lg:w-1/2">
                    <span className="font-extrabold font-sans text-4xl md:text-6xl leading-tight block">
                        <span className="">Your own space to</span> <br />
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Connect With Friends</span>
                    </span>
                    <p className="text-gray-300 mt-6 text-lg tracking-wide md:text-xl font-medium px-4 lg:px-0">
                        Just secure, real-time connection between people, featuring instant message delivery and seamless media uploads. No noisy channels, no unnecessary bloat.
                    </p>
                    <button className="mt-8 font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md px-8 py-3 hover:from-cyan-500 hover:to-blue-600 active:from-cyan-400 active:to-blue-500 hover:cursor-pointer active:bg-white shadow-lg transition-transform hover:-translate-y-0.5" onClick={() => navigate('/signup')} >Get Started</button>
                </div>


                <div className="mt-10 lg:mt-0 w-full lg:w-1/2 max-w-2xl opacity-90 mb-10">
                    <div className="bg-[#111827] backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl flex flex-col overflow-hidden h-[400px] shadow-[0_0_40px_rgba(0,0,0,0.5)]">

                        <div className="h-14 bg-black/10 border-b border-white/5 flex items-center px-4 md:px-6">
                            <span className="font-['Anton','sans-serif'] text-lg tracking-wide select-none">
                                Five<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Stack</span>
                            </span>
                            <div className="mx-auto flex items-center space-x-2">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10 flex items-center justify-center text-blue-300 font-bold uppercase">
                                    I
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-100 text-sm md:text-base">OmegaChungus</span>
                                    <span className="text-[10px] text-green-400 uppercase tracking-wider font-semibold">online</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto flex flex-col space-y-4 bg-[#0B0F19]/40 relative">

                            <div className="max-w-[75%] md:max-w-[60%] flex items-start gap-2 w-full self-start">
                                <div className="rounded-2xl p-3 bg-white/5 backdrop-blur-sm border border-white/5 text-gray-200 shadow-sm rounded-tl-sm w-fit relative group">
                                    Hey, what are you playing nowadays
                                </div>
                                <span className="text-[10px] text-gray-500 mt-1 opacity-70 whitespace-nowrap shrink-0">10:41 AM</span>
                            </div>


                            <div className="max-w-[75%] md:max-w-[60%] flex flex-row-reverse items-start gap-2 w-full self-end">
                                <div className="rounded-2xl p-3 bg-sky-600/40 shadow-[0_4px_15px_rgba(14,165,233,0.3)] text-white backdrop-blur-md rounded-br-sm w-fit relative group">
                                    Recently I tried Hollow Knight, its nearly perfect, from gameplay to the music and lore.
                                </div>
                                <span className="text-[10px] text-gray-500 mt-1 opacity-70 whitespace-nowrap shrink-0">10:43 AM</span>
                            </div>


                            <div className="max-w-[75%] md:max-w-[60%] flex items-start gap-2 w-full self-start">
                                <div className="rounded-2xl p-3 bg-white/5 backdrop-blur-sm border border-white/5 text-gray-200 shadow-sm rounded-tl-sm w-fit relative group">
                                    Sounds like I should try it.
                                </div>
                                <span className="text-[10px] text-gray-500 mt-1 opacity-70 whitespace-nowrap shrink-0">10:44 AM</span>
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-[#111827] to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="w-full relative pb-6 pt-12 mt-auto flex justify-center text-sm text-gray-400">

                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                <div className="z-10">
                    Contact at<a href="mailto:FiveStack56@gmail.com" className="ml-1 text-cyan-400 hover:text-cyan-300 transition-colors border-b border-cyan-400/30 hover:border-cyan-300/80 pb-0.5">FiveStack56@gmail.com</a>
                </div>
            </footer>
        </div>
    )
}

export default Landing