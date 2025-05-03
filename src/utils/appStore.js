import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice'
import feedSlice from './feedSlice'
import connectionRequestSlice from './connectionRequestSlice'
import myConnectionSlice from './myConnectionSlice'

const appStore = configureStore({
    reducer:{
        user:userSlice,
        feed:feedSlice,
        connectionRequest:connectionRequestSlice,
        myConnection:myConnectionSlice
    }
})
export default appStore