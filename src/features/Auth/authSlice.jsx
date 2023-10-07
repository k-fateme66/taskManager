import { createSlice } from "@reduxjs/toolkit";

const LOCAL_STORAG_AUTH_STATE = "authState";
const LOCAL_STORAG_TASKS = "Tasks";
const userData =
  JSON.parse(localStorage.getItem(LOCAL_STORAG_AUTH_STATE)) || {};
const initialState = {
  isAuthenticated: userData.length ? true : false,
  data: userData.length ? [...userData] : [],
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: (state, action) => {
      state.data.push(action.payload);
      state.isAuthenticated = true;
      localStorage.setItem(LOCAL_STORAG_AUTH_STATE, JSON.stringify(state.data));
    },
    Logout: (state, action) => {
      state.data = [];
      state.isAuthenticated = false;
      localStorage.setItem(LOCAL_STORAG_AUTH_STATE, JSON.stringify(state.data));
      localStorage.setItem(LOCAL_STORAG_TASKS, JSON.stringify([]));
    },
  },
});
export const { Login, Logout } = authSlice.actions;

export default authSlice.reducer;
