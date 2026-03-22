import zustandStore from "../misc/zustand.utility";

const Home = () => {
    // Grab the logged-in user's info and the logout function from your brain
    const { authUser, logout } = zustandStore();

    const handleLogout = () => {
        // This wipes the user from Zustand, and App.jsx will instantly kick you back to /login
        logout(); 
    };

    return (
        <div className="flex h-screen bg-black text-white p-4">
            {/* The Main Chat Container (Glassmorphism look) */}
            <div className="flex w-full overflow-hidden rounded-2xl bg-stone-900 border border-stone-700 shadow-2xl">
                
                {/* LEFT COLUMN: Sidebar (Takes up 1/4 of the screen) */}
                <div className="w-1/4 border-r border-stone-700 bg-stone-800 flex flex-col">
                    
                    {/* Header for Sidebar */}
                    <div className="p-4 border-b border-stone-700 flex justify-between items-center bg-stone-900">
                        <span className="font-bold text-lg">Chats</span>
                        {/* Displays the username of whoever is currently logged in! */}
                        <span className="text-sm text-blue-400 font-semibold">@{authUser?.username}</span>
                    </div>

                    {/* Placeholder for the mapped users */}
                    <div className="flex-1 p-4 overflow-y-auto">
                        <p className="text-gray-500 text-sm text-center mt-10">Sidebar Users Coming Soon...</p>
                    </div>

                    {/* Bottom profile area with Logout */}
                    <div className="p-4 border-t border-stone-700 bg-stone-900">
                        <button 
                            onClick={handleLogout}
                            className="w-full rounded bg-red-500/20 py-2 text-red-400 hover:bg-red-500 hover:text-white transition font-bold cursor-pointer"
                        >
                            Log Out
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: Chat Window (Takes up the remaining 3/4 of the screen) */}
                <div className="flex-1 flex flex-col items-center justify-center bg-stone-950">
                    {/* Placeholder for when no one is selected */}
                    <div className="text-center space-y-3">
                        <h2 className="text-3xl font-bold text-gray-300">Welcome to FiveStack</h2>
                        <p className="text-gray-500 text-lg">Select a conversation from the sidebar to start messaging.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;