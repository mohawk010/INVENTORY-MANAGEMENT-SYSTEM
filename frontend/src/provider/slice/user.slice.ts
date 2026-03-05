import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"UserSlice",
    initialState:{
        user:null,
    },
    reducers:{
        setUser:(state,action:any)=>{
            state.user = action.payload
        },
        removeUser:(state, action:any)=>{
            state.user = null
        }
    }
})


export const { removeUser, setUser} = userSlice.actions;


export const UserSlicePath = (state: any)=> state.UserSlice.user

