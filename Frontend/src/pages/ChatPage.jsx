import { useEffect, useState } from "react";
import zustandStore from "../misc/zustand.utility";

const Chat = () => {
    const { 
        authUser, logout, users, getUsers, 
        selectedUser, setSelectedUser, 
        messages, getMessages, sendMessages,
        searchUser 
    } = zustandStore();

    const [text, setText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser.id);
        }
    }, [selectedUser, getMessages]);

    const handleSearch = async (e) => {
        e.preventDefault();
        // If search is empty, just refresh the recent chats list
        if (!searchTerm.trim()) {
            await getUsers();
            return;
        }
        await searchUser(searchTerm);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim()) return; 
        await sendMessages(text); 
        setText(""); 
    };

    return (
        <div className="flex h-screen bg-black text-white p-4">
            <div className="flex w-full overflow-hidden rounded-2xl bg-stone-900 border border-stone-700 shadow-2xl">
                
                {/* SIDEBAR */}
                <div className="w-1/4 border-r border-stone-700 bg-stone-800 flex flex-col">
                    <div className="p-4 border-b border-stone-700 flex justify-between items-center bg-stone-900">
                        <span className="font-bold text-lg text-blue-400">FiveStack</span>
                        <span className="text-xs text-gray-400">@{authUser?.username}</span>
                    </div>

                    {/* Search Bar */}
                    <div className="p-3 border-b border-stone-700 bg-stone-900/50">
                        <form onSubmit={handleSearch} className="flex space-x-2">
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search usernames..." 
                                className="flex-1 bg-stone-800 text-sm text-white rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded-md transition cursor-pointer">
                                Find
                            </button>
                        </form>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {users.length === 0 ? (
                            <p className="text-gray-500 text-xs text-center mt-10 px-4 italic">No users found.</p>
                        ) : (
                            users.map((user) => (
                                <div 
                                    key={user.id}
                                    onClick={() => setSelectedUser(user)}
                                    className={`p-4 border-b border-stone-700/50 cursor-pointer transition-all ${
                                        selectedUser?.id === user.id ? 'bg-blue-600/20 border-l-4 border-blue-500' : 'hover:bg-stone-700'
                                    }`}
                                >
                                    <div className="font-semibold">{user.username}</div>
                                    <div className="text-[10px] text-gray-500 truncate">{user.email}</div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-4 border-t border-stone-700 bg-stone-900">
                        <button onClick={() => logout()} className="w-full rounded bg-red-500/10 py-2 text-red-500 hover:bg-red-500 hover:text-white transition text-xs font-bold cursor-pointer">
                            LOGOUT
                        </button>
                    </div>
                </div>

                {/* MAIN CHAT AREA */}
                <div className="flex-1 flex flex-col bg-stone-950">
                    {!selectedUser ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                            <div className="w-20 h-20 bg-stone-800 rounded-full mb-4 flex items-center justify-center text-3xl">👋</div>
                            <h2 className="text-2xl font-bold text-gray-200">Select a conversation</h2>
                            <p className="text-gray-500 max-w-xs">Search for a user above to start a new chat or pick a recent one.</p>
                        </div>
                    ) : (
                        <>
                            <div className="p-4 border-b border-stone-700 bg-stone-900 flex items-center justify-between">
                                <span className="font-bold text-lg">{selectedUser.username}</span>
                                <span className="text-xs text-green-500 uppercase tracking-widest font-mono">online</span>
                            </div>

                            <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3">
                                {messages.length === 0 ? (
                                    <div className="flex-1 flex items-center justify-center text-gray-600 italic text-sm">No messages yet...</div>
                                ) : (
                                    messages.map((msg, index) => {
                                        const isMe = msg.senderId === authUser.id; 
                                        return (
                                            <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                                                    isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-stone-800 text-gray-200 rounded-bl-none'
                                                }`}>
                                                    {msg.content}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            <div className="p-4 bg-stone-900 border-t border-stone-700">
                                <form onSubmit={handleSendMessage} className="flex space-x-2">
                                    <input 
                                        type="text" 
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder="Type your message..." 
                                        className="flex-1 bg-stone-800 border border-stone-700 text-white rounded-xl px-4 py-2 outline-none focus:border-blue-500 transition-all"
                                    />
                                    <button 
                                        type="submit" 
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition shadow-lg cursor-pointer"
                                    >
                                        Send
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chat;