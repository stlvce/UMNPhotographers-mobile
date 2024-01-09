import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../api";

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await AsyncStorage.removeItem("SESSION");
      await dispatch(authApi.endpoints.authLogout.initiate());
      // Сброс сохраненных запросов
      dispatch(api.util.resetApiState());
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const checkSession = createAsyncThunk(
  "auth/ping",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await dispatch(authApi.endpoints.authPing.initiate());
      if (data) {
        return data;
      }
      return Promise.reject("Сессия истекла");
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
    builder
      .addCase(checkSession.fulfilled, (state) => {
        state.activeRootScreen = "Main";
      })
      .addCase(checkSession.rejected, (state) => {
        state.activeRootScreen = "Вход";
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
export const { closeStatusSU, saveStatePNToken } = authSlice.actions;
