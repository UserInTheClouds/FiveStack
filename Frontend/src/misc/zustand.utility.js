import {create} from 'zustand'
import axios from 'axios'

const zustandStore = create((set)=>({
    authUser:null,
    selectedUser:null,
    messages:[],
    users:[],
    isCheckingAuth:true,
    checkAuth: async ()=>{
        try {
            const res = await axios.get('/api/auth/check', {withCredentials:true})
            set({authUser: res.data})
            
        } catch (error) {
            set({ authUser: null })
        }
        finally{
            set({ isCheckingAuth: false })
        }
    },

    getUsers: async () => {
        try {
            const res = await axios.get('/api/messages/users',{withCredentials:true});
            set({users: res.data});
        } catch (error) {  
            console.log('Failed to get users',error);
        }
    },

    getMessages: async (userId) => {
        try{
        const res = await axios.get(`/api/messages/receive/${userId}`,{withCredentials:true});
        set({messages:res.data})
        }
        catch(error){
            console.log("Failed to get messages",error);
        }
    },

    sendMessages: async (text) => {
        try {
            const {messages, selectedUser} = zustandStore.getState();
            const res = await axios.post(`/api/messages/send/${selectedUser.id}`,{text},{withCredentials:true});
            set({messages:[...messages,res.data]});      
        } catch (error) {
            console.log('Error in sending messages',error);
        }
    },

    searchUser: async (searchText) => {
        try {
            const res = await axios.get(`/api/messages/users/search?text=${searchText}`,{withCredentials:true});
            set({users:res.data});
        } catch (error) {
            console.log('Failed to search users',error);
        }
    },

    setAuthUser: (user) => set({authUser:user}),
    setSelectedUser: (user) => set({selectedUser:user}),
    logout: async () => {
        try {
            const res = await axios.post('/api/auth/logout',{},{withCredentials:true})
            set({authUser:null, selectedUser:null, messages:[],users:[]})
        } catch (error) {
            console.log("failed to log out",error);
        }
    }
}))

export default zustandStore