import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

const initialState = {
  user: {},
};

export const updateUserInfo = createAsyncThunk(
  "user/updateUser",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      await dispatch(userApi.endpoints.updateUserInfo.initiate(formData));
      return await dispatch(userApi.endpoints.userInfo.initiate());
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });
    builder.addMatcher(
      userApi.endpoints.userInfo.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      },
    );
  },
});

export default userSlice.reducer;
