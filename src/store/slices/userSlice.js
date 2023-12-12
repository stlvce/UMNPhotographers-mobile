import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

const initialState = {
  user: {},
  statusUpdateUserInfo: {
    isVisible: false,
    errorMessage: null,
  },
};

export const updateUserInfo = createAsyncThunk(
  "user/updateUser",
  async (formData, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState();
      if (formData.email !== state.user.email) {
        await dispatch(
          userApi.endpoints.updateCredential.initiate({
            email: formData.email,
          }),
        );
      }
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
  reducers: {
    closeStatusUpdate: (state) => {
      state.statusUpdateUserInfo = { isVisible: false, errorMessage: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.statusUpdateUserInfo.isVisible = true;
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.user = action.payload.data;
        state.statusUpdateUserInfo = {
          isVisible: true,
          errorMessage: "Ошибка",
        };
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
export const { closeStatusUpdate } = userSlice.actions;
