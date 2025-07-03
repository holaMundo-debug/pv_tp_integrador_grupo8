// store/userSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

// Cargar usuario desde localStorage
const getSession = () => {
  return JSON.parse(localStorage.getItem("sessionUser")) || null;
};

const initialState = {
  usuario: getSession(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.usuario = action.payload;
    },
    logout: (state) => {
      state.usuario = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;