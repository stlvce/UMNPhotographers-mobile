import { createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

const initialState = {
  user: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.userInfo.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      userApi.endpoints.updateUserInfo.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export default userSlice.reducer;
// export const { changeVisibleAddTechModal } = authSlice.actions;
