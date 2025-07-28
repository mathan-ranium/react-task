import { createSlice } from "@reduxjs/toolkit";
import { getusers } from "./userThunks";
const initialState = {
  users: [],
  loading: false,
  error: null,

};

const userSlice = createSlice({
  name: "userSlice",
 initialState:initialState,reducers:{},
  extraReducers: (builder) => {

  return  builder
      .addCase(getusers.pending, (state, action) => {
        console.log(action);

        state.users = [];
        state.loading = true;
      })
      .addCase(getusers.fulfilled, (state, action) => {
        state.users = action.payload.data;
          state.loading = false;
      })
      .addCase(
        getusers.rejected,
        (state, action) => {
          console.log(action);

          state.users = [];
          state.loading = false;
        }
      );
  },
});

export default userSlice.reducer;
