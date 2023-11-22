import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";
import api from "../../api";

const initialState = {
  user: "",
};

export const updateUserInfo = createAsyncThunk(
  "user/updateUser",
  async (formData, { rejectWithValue }) => {
    try {
      await api.updateUserInfo(formData);
      const response = await api.userInfo();
      return response;
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
      console.log(action.payload);
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
// export const { changeVisibleAddTechModal } = authSlice.actions;
