import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addUserToFeed : (state,action) =>{
            return action.payload
        },
        removeUserFromFeed : (state,action) =>{
            const newFeed = state.filter((userId) => userId._id !== action.payload)
            return newFeed
        }
    }
})
export const {addUserToFeed,removeUserFromFeed} = feedSlice.actions
export default feedSlice.reducer