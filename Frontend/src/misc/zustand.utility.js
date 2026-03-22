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
            //CHANGE to https when deploying
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

    setAuthUser: (user) => set({authUser:user}),
    setSelectedUser: (user) => set({selectedUser:user}),
    setMessage: (newMessage) => set({message:newMessage}),
    addMessage: (message) => set((state)=>({messages:[...state.messages,message]})),
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