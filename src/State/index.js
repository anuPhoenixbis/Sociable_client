import {createSlice} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const themes ={
    dark: 'black',
    light: 'cupcake'
}

const initialState={
    mode: "light",
    user: null,
    token: null,
    posts: []
}

export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers:{
        setMode: (state)=>{
            const {light,dark} = themes
            state.mode = state.mode === light ? dark : light
            document.documentElement.setAttribute('data-theme',state.mode)
        },
        setUser: (state,action)=>{
            state.user = action.payload;
        },
        setLogin: (state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            toast.success('Successfully logged in!' ,{
                theme: state.mode === "black" ? "dark" : "light"
            })
        },
        setLogout: (state)=>{
            state.user = null;
            state.token = null;
            toast.info('Successfully logged out!',{
                theme: state.mode === "black" ? "dark" : "light"
            })
        },
        setFriends: (state,action)=>{
            if(state.user){
                state.user.friends = action.payload.friends;//updating the friends map from the action payload
            }else {
                toast.error("user friends non-existent",{
                theme: state.mode === "black" ? "dark" : "light"
                })
            }
        },
        setPosts: (state,action)=>{
            state.posts = [action.payload.posts];
        },
        setPost: (state,action)=>{
            const updatedPosts = state.posts.map((post)=>{//to show the post that we clicked on
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            })
            state.posts = updatedPosts;
        }
    }
})

export const {
    setMode,
    setLogin,
    setLogout,
    setUser,
    setFriends,
    setPost,
    setPosts
} = authSlice.actions

export default authSlice.reducer;