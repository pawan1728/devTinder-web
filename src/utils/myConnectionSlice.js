import { createSlice } from "@reduxjs/toolkit";

const myConnectionSlice = createSlice({
  name: "myConnection",
  initialState: null,
  reducers: {
    addMyConnection: (state, action) => {
      return action.payload;
    },
    removeMyConnection: (state, action) => {
      return null;
    },
  },
});
export const { addMyConnection, removeMyConnection } =
  myConnectionSlice.actions;
export default myConnectionSlice.reducer;
