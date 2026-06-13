import { create } from 'zustand'
import axios from 'axios'
import { io } from 'socket.io-client'

axios.defaults.baseURL = import.meta.env.MODE === 'development' ? "" : import.meta.env.VITE_BACKEND_URL;
let isRefreshing = false;
let failures = [];

const tries = (error, token = null) => {
    failures.forEach(promise => {
        if (error) {
            promise.reject(error)
        }
        else {
            promise.resolve(token);
        }
    })
    failures = [];
}

axios.interceptors.response.use((response) => response, async (error) => {
    const originalRequest = error.config
    if (
        error.response &&
        error.response.status === 401 &&
        error.response.data?.message === "AccessTokenExpired" &&
        !originalRequest._retry
    ) {
        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failures.push({ resolve, reject });
            })
                .then(() => {
                    return axios(originalRequest);
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        }
        originalRequest._retry = true;
        isRefreshing = true;
        try {
            await axios.post('/api/auth/refresh', {}, { withCredentials: true });
            isRefreshing = false;
            tries(null);
            return axios(originalRequest);
        } catch (refreshError) {
            isRefreshing = false;
            tries(refreshError, null);
            zustandStore.getState().setAuthUser(null);
            zustandStore.getState().disconnectSocket();
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
}
);

const zustandStore = create((set, get) => ({
    authUser: null,
    socket: null,
    selectedUser: null,
    messages: [],
    onlineUsers: [],
    users: [],
    isCheckingAuth: true,

    baseURL: (import.meta.env.MODE === "development" ? "http://localhost:3000" : 'https://fivestack-backend.onrender.com/'),
    connectSocket: () => {
        const { authUser, baseURL } = get();
        if (!authUser) return;
        const socket = io(baseURL, {
            query: { userId: authUser.id },
            withCredentials: true
        });
        socket.on('connect', () => {
            console.log("Connected to socket server");
        })
        socket.on('receiveOnlineUserList', (userIds) => {
            set({ onlineUsers: userIds });
        })
        socket.on('newMessage', (message) => {
            set((state) => ({
                messages: [...new Map(
                    [...state.messages, message].map(m => [m.id, m])
                ).values()]
            }));
        });
        set({ socket });
    },
    disconnectSocket: () => {
        const { socket } = get();
        if (socket) {
            socket.disconnect();
            socket.off('receiveOnlineUserList');
            set({ socket: null, onlineUsers: [] });
        }
    },

    initCsrf: async () => {
        try {
            const res = await axios.get('/api/csrf-token', { withCredentials: true });
            axios.defaults.headers.common['x-csrf-token'] = res.data.csrfToken;
        } catch (error) {
            console.log("Failed to fetch CSRF token", error);
        }
    },
    checkAuth: async () => {
        try {
            const res = await axios.get('/api/auth/check', { withCredentials: true })
            set({ authUser: res.data })

        } catch (error) {
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    getUsers: async () => {
        try {
            const res = await axios.get('/api/messages/users', { withCredentials: true });
            set({ users: res.data });
        } catch (error) {
            console.log('Failed to get users', error);
        }
    },

    getMessages: async (userId) => {
        try {
            const res = await axios.get(`/api/messages/receive/${userId}`, { withCredentials: true });
            const fetchedMessages = res.data;
            set((state) => ({
                messages: [...new Map(
                    [...state.messages, ...fetchedMessages].map(m => [m.id, m])
                ).values()]
            }))
        }
        catch (error) {
            console.log("Failed to get messages", error);
        }
    },

    sendMessages: async (text, image) => {
        try {
            const { messages, selectedUser } = zustandStore.getState();
            const formdata = new FormData();
            if (text) formdata.append('text', text);
            if (image) formdata.append('image', image);
            const res = await axios.post(`/api/messages/send/${selectedUser.id}`, formdata, { withCredentials: true });
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.log('Error in sending messages', error);
        }
    },

    searchUser: async (searchText) => {
        try {
            const res = await axios.get(`/api/messages/users/search?text=${searchText}`, { withCredentials: true });
            set({ users: res.data });
        } catch (error) {
            console.log('Failed to search users', error);
        }
    },

    setAuthUser: (user) => set({ authUser: user }),
    setSelectedUser: (user) => set({ selectedUser: user }),
    logout: async () => {
        try {
            const res = await axios.post('/api/auth/logout', {}, { withCredentials: true })
            set({ authUser: null, selectedUser: null, messages: [], users: [] })
        } catch (error) {
            console.log("failed to log out", error);
        }
    },

}))

export default zustandStore
