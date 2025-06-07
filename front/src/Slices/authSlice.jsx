

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,  
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },

    setLogout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("signupData");
    }
  }
});

export const { setToken , setUser , setLogout } = authSlice.actions;
export default authSlice.reducer;
