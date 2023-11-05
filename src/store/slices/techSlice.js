import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisibleAddTechModal: false,
};

const techSlice = createSlice({
  name: "tech",
  initialState,
  reducers: {
    changeVisibleAddTechModal: (state) => {
      state.isVisibleAddTechModal = !state.isVisibleAddTechModal;
    },
  },
});

export default techSlice.reducer;
export const { changeVisibleAddTechModal } = techSlice.actions;
