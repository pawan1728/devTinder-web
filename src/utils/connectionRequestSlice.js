import { createSlice } from "@reduxjs/toolkit";

const connectionrequestSlice = createSlice({
    name:"connectionRequest",
    initialState:null,
    reducers:{
        addConnectionrequest:(state,action)=>{
            return action.payload
        },
        removeConnectionRequest:(state,action) =>{
            const newConnectionArr = state.filter((u)=>{
              return  u._id !== action.payload
            })
            return newConnectionArr
        }
    }
})
export const {addConnectionrequest,removeConnectionRequest} = connectionrequestSlice.actions
export default connectionrequestSlice.reducer