import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "./slice/user.slice";
import { AuthApi } from "./queries/Auth.query";

export const store = configureStore({
    reducer:{
        [userSlice.name]:userSlice.reducer,
        [AuthApi.reducerPath]:AuthApi.reducer,
    },

    middleware: (d)=>d().concat(AuthApi.middleware)  
})

setupListeners(store.dispatch)


