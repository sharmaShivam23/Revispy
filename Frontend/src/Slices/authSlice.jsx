

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null, 
  // user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },

    // setUser(state , action){
    //    state.user = action.payload;
    // },
    setLogout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
});

export const { setToken , setUser , setLogout } = authSlice.actions;
export default authSlice.reducer;
