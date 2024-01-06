import { createSlice } from "@reduxjs/toolkit";

type initialState = {
  isOpen: boolean;
};

const blurModalSlice = createSlice({
  name: "blurModal",
  initialState: {
    isOpen: false,
  } as initialState,
  reducers: {
    closeBlurModal: (state) => {
      state.isOpen = false;
    },
    openBlurModal: (state) => {
      state.isOpen = true;
    },
  },
});


export default blurModalSlice.reducer;
export const {closeBlurModal, openBlurModal} = blurModalSlice.actions;