import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.authLogin.matchFulfilled,
      (state, action) => {
        // console.log(
        //   action.meta.baseQueryMeta.response.headers.map["set-cookie"],
        //   "COOKIE"
        // );
      }
    );
  },
});

export default authSlice.reducer;
export const { checkSessionId } = authSlice.actions;
