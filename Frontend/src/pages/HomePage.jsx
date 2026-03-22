import { useEffect } from "react";
import zustandStore from "../misc/zustand.utility";

const Home = () => {
    // 1. Grab everything we need from your Zustand brain
    const { authUser, logout, users, getUsers, selectedUser, setSelectedUser } = zustandStore();

    // 2. The moment this page loads, fetch the users from the backend
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const handleLogout = () => {
        logout(); 
    };

    return (
        <div className="flex h-screen bg-black text-white p-4">
            <div className="flex w-full overflow-hidden rounded-2xl bg-stone-900 border border-stone-700 shadow-2xl">
                
                {/* LEFT COLUMN: Sidebar */}
                <div className="w-1/4 border-r border-stone-700 bg-stone-800 flex flex-col">
                    
                    {/* Sidebar Header */}
                    <div className="p-4 border-b border-stone-700 flex justify-between items-center bg-stone-900">
                        <span className="font-bold text-lg">Chats</span>
                        <span className="text-sm text-blue-400 font-semibold">@{authUser?.username}</span>
                    </div>

                    {/* The User List (The Magic Part) */}
                    <div className="flex-1 overflow-y-auto">
                        {users.length === 0 ? (
                            <p className="text-gray-500 text-sm text-center mt-10">No other users found.</p>
                        ) : (
                            users.map((user) => (
                                <div 
                                    key={user.id}
                                    onClick={() => setSelectedUser(user)}
                                    // If this is the selected user, make it blue. Otherwise, make it hoverable.
                                    className={`p-4 border-b border-stone-700/50 cursor-pointer transition-colors ${
                                        selectedUser?.id === user.id ? 'bg-blue-600/20 border-l-4 border-blue-500' : 'hover:bg-stone-700'
                                    }`}
                                >
                                    <div className="font-semibold">{user.username}</div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Sidebar Footer (Logout) */}
                    <div className="p-4 border-t border-stone-700 bg-stone-900">
                        <button 
                            onClick={handleLogout}
                            className="w-full rounded bg-red-500/20 py-2 text-red-400 hover:bg-red-500 hover:text-white transition font-bold cursor-pointer"
                        >
                            Log Out
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: Chat Window Placeholder */}
                <div className="flex-1 flex flex-col bg-stone-950 items-center justify-center">
                    {!selectedUser ? (
                        <div className="text-center space-y-3">
                            <h2 className="text-3xl font-bold text-gray-300">Welcome to FiveStack</h2>
                            <p className="text-gray-500 text-lg">Select a conversation from the sidebar to start messaging.</p>
                        </div>
                    ) : (
                        <div className="text-center space-y-3">
                            <h2 className="text-2xl font-bold text-white">Chatting with {selectedUser.username}</h2>
                            <p className="text-gray-500">We will build the message UI here next!</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Home;