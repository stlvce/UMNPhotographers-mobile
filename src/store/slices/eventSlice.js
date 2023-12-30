import { createSlice } from "@reduxjs/toolkit";
import { eventApi } from "../../api/eventApi";

const initialState = {
  statusUpsertFreeTime: {
    isVisible: false,
    errorMessage: null,
  },
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    closeStatusUpsertFreeTime: (state) => {
      state.statusUpsertFreeTime = { isVisible: false, errorMessage: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        eventApi.endpoints.upsertFreeTime.matchFulfilled,
        (state, action) => {
          state.statusUpsertFreeTime.isVisible = true;
        },
      )
      .addMatcher(
        eventApi.endpoints.upsertFreeTime.matchRejected,
        (state, action) => {
          state.statusUpsertFreeTime = {
            isVisible: true,
            errorMessage: "Ошибка",
          };
        },
      );
  },
});

export default eventSlice.reducer;
export const { closeStatusUpsertFreeTime } = eventSlice.actions;
