import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isSeller: false,
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isSeller = action.payload.user.role === "seller";
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    getUser(state, action) {
      state.user = action.payload?.user;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isSeller = false;
      state.accessToken = "";
      state.refreshToken = "";
    },
  },
});

export const { setUser, getUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
