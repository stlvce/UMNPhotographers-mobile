import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await AsyncStorage.removeItem("SESSION");
      await dispatch(authApi.endpoints.authLogout.initiate());
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const initialState = {
  sessionId: "",
  activeRootScreen: "",
  statusSignUp: {
    isError: false,
    errorMessage: null,
  },
  pnToken: "",
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
    saveStatePNToken: (state, action) => {
      state.pnToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.sessionId = "";
    });
    builder.addMatcher(
      authApi.endpoints.authRegister.matchRejected,
      (state) => {
        state.statusSignUp = {
          isVisible: true,
          errorMessage: "Ошибка",
        };
      },
    );
    builder.addMatcher(authApi.endpoints.authLogout.matchRejected, (state) => {
      state.sessionId = "";
      state.activeRootScreen = "Вход";
    });
  },
});

export default authSlice.reducer;
export const { checkSessionId, closeStatusSU, saveStatePNToken } =
  authSlice.actions;
