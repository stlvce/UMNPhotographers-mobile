import { configureStore, combineReducers } from "@reduxjs/toolkit";
import techSlice from "./slices/techSlice";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import api from "../api";
import { setupListeners } from "@reduxjs/toolkit/query";

const rootReducers = combineReducers({
  tech: techSlice,
  auth: authSlice,
  user: userSlice,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: true }).concat(api.middleware),
});

setupListeners(store.dispatch);
