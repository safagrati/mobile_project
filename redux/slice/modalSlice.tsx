import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalState = {
  isOpen: boolean;
  id: string | null;
};

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    id: null,
  } as ModalState,
  reducers: {
    openModalEdit: (state, action: PayloadAction<{ id: string }>) => {
      state.isOpen = true;
      state.id = action.payload.id;
    },
    openModalAdd: (state) => {
      state.isOpen = true;
      state.id = null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.id = null;
    },
  
  },
});

export const { openModalEdit, closeModal, openModalAdd, } =
  modalSlice.actions;
export default modalSlice.reducer;
