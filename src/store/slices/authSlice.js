import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi";

const initialState = {
  sessionId: "",
  activeRootScreen: "",
  statusSignUp: {
    isError: false,
    errorMessage: null,
  },
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
    closeStatusSU: (state) => {
      state.statusSignUp = { isError: false, errorMessage: null };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.authRegister.matchRejected,
      (state) => {
        state.statusSignUp = {
          isVisible: true,
          errorMessage: "Ошибка",
        };
      },
    );
  },
});

export default authSlice.reducer;
export const { checkSessionId, closeStatusSU } = authSlice.actions;
