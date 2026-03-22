import {create} from 'zustand'
import axios from 'axios'

const zustandStore = create((set)=>({
    authUser:null,
    selectedUser:null,
    messages:[],

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

    setAuthUser: (user) => set({authUser:user}),
    setSelectedUser: (user) => set({selectedUser:user}),
    setMessage: (newMessage) => set({message:newMessage}),
    addMessage: (message) => set((state)=>({messages:[...state.messages,message]})),
    logout: () => set({authUser:null, selectedUser:null, messages:[]})
}))

export default zustandStore