import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Expenses } from "../../data/model";
import uuid from "react-native-uuid";
import { EXPENSE_DATA } from "../../data/data";

type ExpenseState = {
  expenses: Expenses[];
};
export type ExpenseAddState = {
  category: Category | null;
  name: string;
  amount: number;
  date: Date;
};

type ExpenseDataState = {
  category: Category | null;
  name: string;
  amount: number;
  date: Date;
  id: string;
};
const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
  } as ExpenseState,
  reducers: {
    addExpense: (state, action: PayloadAction<ExpenseDataState>) => {
      const expense = { ...action.payload };
      state.expenses.push(expense);
    },
    resetExpense: (state) => {
      state.expenses = []
    },
    setExpense: (state, action: PayloadAction<ExpenseDataState[]>) => {
      state.expenses = action.payload;
    },
    deleteExpense: (state, action: PayloadAction<{ id: string }>) => {
      const expenseList = state.expenses;

      const newList = expenseList.filter(
        (expense) => expense.id !== action.payload.id
      );

      state.expenses = newList;
    },
    updateExpense: (
      state,
      action: PayloadAction<{ id: string; expense: ExpenseAddState }>
    ) => {
      const expenseIndex = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updatableExpense = state.expenses[expenseIndex];

      const updatedItem = { ...updatableExpense, ...action.payload.expense };

      state.expenses[expenseIndex] = updatedItem;
    },
    doNothing: (state) => {
      const expList = [...state.expenses];
      state.expenses = expList;
    },
  },
});

export const { addExpense, resetExpense, deleteExpense, updateExpense, doNothing, setExpense } =
  expenseSlice.actions;
export default expenseSlice.reducer;
