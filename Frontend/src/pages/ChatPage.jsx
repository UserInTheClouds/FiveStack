import { useEffect, useState } from "react";
import zustandStore from "../misc/zustand.utility";

const Chat = () => {
    const { 
        authUser, logout, users, getUsers, 
        selectedUser, setSelectedUser,onlineUsers, 
        messages, getMessages, sendMessages,
        searchUser,socket,connectSocket,disconnectSocket 
    } = zustandStore();

    
    const [text, setText] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [image,setImage] = useState(null);
    
    useEffect(() => {
        getUsers();
    }, [getUsers]);

    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser.id);
        }
    }, [selectedUser, getMessages]);

    const online_users = onlineUsers.filter(user=>user.id != authUser?.id);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            await getUsers();
            return;
        }
        await searchUser(searchTerm);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !image) return; 
        await sendMessages(text, image); 
        setText(""); 
        setImage(null);
    };

    return (
        <div className="flex h-screen bg-[#0B0F19] text-gray-100 p-2 sm:p-4 md:p-6 lg:p-8 font-sans">
            <div className="flex w-full overflow-hidden rounded-3xl bg-[#111827]/80 backdrop-blur-xl border border-white/5 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                
                {/* SIDEBAR */}
                <div className="w-1/3 max-w-[320px] lg:max-w-[400px] border-r border-white/5 bg-black/20 flex flex-col">
                    <div className="p-5 border-b border-white/5 flex justify-between items-center bg-black/10">
                    <span className="font-['Anton','sans-serif'] text-2xl tracking-wide select-none">
                    Five<span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Stack</span>
                    </span>
                        <span className="text-xs font-medium text-gray-400 bg-white/5 px-2 py-1 rounded-full">{authUser?.username}</span>
                    </div>

                    {/* Search Bar */}
                    <div className="p-4 border-b border-white/5 bg-black/10">
                        <form onSubmit={handleSearch} className="flex space-x-2 relative">
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search usernames..." 
                                className="flex-1 bg-white/5 text-sm text-gray-200 rounded-xl pl-4 pr-16 py-2.5 outline-none border border-white/5 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-500"
                            />
                            <button type="submit" className="absolute right-1 top-1 bottom-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs px-4 rounded-lg transition-colors cursor-pointer font-medium">
                                Find
                            </button>
                        </form>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {users.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500 opacity-70">
                                <p className="text-sm">No users found.</p>
                            </div>
                        ) : (
                            users.map((user) => (
                                <div 
                                    key={user.id}
                                    onClick={() => setSelectedUser(user)}
                                    className={`p-4 flex items-center space-x-3 cursor-pointer transition-all border-b border-white/5 ${
                                        selectedUser?.id === user.id ? 'bg-blue-500/10 border-l-4 border-l-blue-500' : 'hover:bg-white/5 border-l-4 border-l-transparent'
                                    }`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10 flex items-center justify-center text-blue-300 font-bold uppercase shrink-0">
                                        {user.username.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-gray-200 truncate">{user.username}</div>
                                        {online_users.includes(String(user.id)) &&                                         
                                            <span className="text-[10px] text-green-400 uppercase tracking-wider font-semibold flex items-center">
                                            online
                                        </span>}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="p-4 bg-black/20 mt-auto border-t border-white/5 flex items-center justify-between">
                        <button 
                            onClick={() => logout()} 
                            className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all cursor-pointer border border-red-500/20 hover:border-red-500 group"
                            title="Log out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* MAIN CHAT AREA */}
                <div className="flex-1 flex flex-col relative bg-[#0B0F19]/40">
                    {!selectedUser ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-10">
                            <div className="w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full mb-6 flex items-center justify-center border border-white/10">
                             <div className="w-12 h-12 rounded-full border-t-2 border-l-2 border-blue-400 animate-pulse"></div>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-200 mb-2">Connect with Friends</h2>
                            <p className="text-gray-500 max-w-sm text-sm">Search for a user in the sidebar to start a new conversation or select from your recent chats.</p>
                        </div>
                    ) : (
                        <>
                            <div className="px-6 py-4 border-b border-white/5 bg-black/10 flex items-center justify-between backdrop-blur-md sticky top-0 z-10">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-white/10 flex items-center justify-center text-blue-300 font-bold uppercase">
                                        {selectedUser.username.charAt(0)}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold text-gray-100">{selectedUser.username}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 p-6 overflow-y-auto flex flex-col space-y-4">
                                {messages.length === 0 ? (
                                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-sm">
                                        <div className="w-16 h-16 mb-4 opacity-20 bg-white/10 rounded-full flex items-center justify-center text-2xl">👋</div>
                                        <p>Say hello to {selectedUser.username}!</p>
                                    </div>
                                ) : (
                                    messages.map((msg, index) => {
                                        const isMe = msg.senderId === authUser.id; 
                                        const dateObj = new Date(msg.createdAt);
                                        const day = dateObj.getDate();
                                        const month = dateObj.toLocaleString('en-US', { month: 'short' }); // gets "Jan", "Feb", "May", etc.
                                        const year = dateObj.getFullYear();

                                        const messageDate = `${day} ${month}, ${year}`;
                                        const messageTime = new Date(msg.createdAt).toLocaleTimeString([], { 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                         });
                                        return (
                                            <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'} group hover:opacity-100 transition-opacity`}>
                                                {isMe &&                                                 
                                                    <div className={`text-[10px] text-right px-1.5 pt-1 text-gray-400 font-semibold`}>
                                                    {messageTime} <span className="px-1"></span> {messageDate}
                                                </div> }
                                                <div className={`max-w-[75%] flex flex-col rounded-2xl px-5 py-3 text-[14px] leading-relaxed relative backdrop-blur-md ${
                                                    isMe 
                                                    ? msg.content && 'bg-sky-600/40 shadow-[0_4px_15px_rgba(14,165,233,0.3)] text-white rounded-br-sm' || (msg.image)
                                                    : 'bg-white/5 shadow-[0_4px_15px_rgba(0,0,0,0.1)] text-gray-100 rounded-bl-sm border border-white/10'
                                                }`}>
                                                    {msg.image && <img src={msg.image} alt="Attachment" className="max-w-full rounded-xl mb-2" />}
                                                    {msg.content && <span>{msg.content}</span>}
                                                </div>
                                                {!isMe && <div className={`pl-1 pt-1 font-semibold text-[10px] ${isMe?'text-sky-100/20 text-left':`text-gray-400 text-right`}`}>
                                                    {messageTime} <span className="px-1"></span> {messageDate}
                                                </div>}
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            <div className="p-4 sm:p-5 bg-black/20 border-t border-white/5 backdrop-blur-sm">
                                <form onSubmit={handleSendMessage} className="flex space-x-3">
                                    {image && (
                                        <div className="absolute -top-10 left-4 text-xs bg-blue-500/20 text-blue-300 font-medium px-3 py-1.5 rounded-full flex items-center shadow-lg border border-blue-500/30">
                                            {image.name} 
                                            <button type="button" onClick={()=>setImage(null)} className="ml-2 text-blue-300 hover:text-red-400 font-bold transition-colors">✕</button>
                                        </div>
                                    )}
                                    <div className="flex items-center space-x-2">
                                        <input type="file" id="file-upload" accept="image/*" onChange={(e)=>setImage(e.target.files[0])} style={{display:"none"}} />
                                    </div>
                                    <label htmlFor="file-upload" className="p-2 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-all flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-gray-400 hover:text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                        </svg>
                                    </label>
                                    <div className="flex-1 relative">
                                        <input 
                                            type="text" 
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            placeholder="Type a message..." 
                                            className="w-full bg-white/5 border border-white/10 text-gray-100 rounded-2xl pl-5 pr-4 py-3.5 outline-none focus:border-sky-500/50 focus:bg-white/10 transition-all placeholder:text-gray-500 text-sm"
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/50 font-semibold py-3.5 px-6 rounded-2xl transition-all shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] cursor-pointer active:scale-95 flex items-center justify-center min-w-[100px] border border-white/20 hover:border-white/30"
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