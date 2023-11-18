import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionId: "",
  activeRootScreen: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkSessionId: (state, action) => {
      if (action.payload) {
        state.sessionId = action.payload;
        state.activeRootScreen = "Main";
      } else {
        state.activeRootScreen = "Вход";
      }
    },
  },
});

export default authSlice.reducer;
export const { checkSessionId } = authSlice.actions;
