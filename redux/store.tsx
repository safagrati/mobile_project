import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slice/modalSlice";
import expenseSlice from "./slice/expenseSlice";
import blurModalSlice from "./slice/blurModalSlice";
import incomeSlice from "./slice/incomeSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    expense: expenseSlice,
    blurModal: blurModalSlice,
    income: incomeSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
