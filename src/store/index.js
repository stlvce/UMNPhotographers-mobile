import { configureStore, combineReducers } from "@reduxjs/toolkit";
import techSlice from "./reducers/techSlice";

const rootReducers = combineReducers({
  tech: techSlice,
});

export const store = configureStore({
  reducer: rootReducers,
});
