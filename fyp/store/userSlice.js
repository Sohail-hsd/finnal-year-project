import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: '',
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, actions) => {
      state.value += 1;
    },
    logout: (state, actions) => {
      state.value -= 1;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
