import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, Incomes } from "../../data/model";
import uuid from "react-native-uuid";
import { INCOME_DATA } from "../../data/data";

type IncomeState = {
    incomes: Incomes[];
};
export type IncomeAddState = {
    category: Category | null;
    name: string;
    amount: number;
    date: Date;
};

type IncomeDataState = {
    category: Category | null;
    name: string;
    amount: number;
    date: Date;
    id: string;
};
const incomeSlice = createSlice({
    name: "income",
    initialState: {
        incomes: [],
    } as IncomeState,
    reducers: {
        addIncome: (state, action: PayloadAction<IncomeDataState>) => {
            const income = { ...action.payload };
            state.incomes.push(income);
        },
        resetIncome: (state) => {
            state.incomes = []
        },
        setIncome: (state, action: PayloadAction<IncomeDataState[]>) => {
            state.incomes = action.payload;
        },
        deleteIncome: (state, action: PayloadAction<{ id: string }>) => {
            const incomeList = state.incomes;

            const newList = incomeList.filter(
                (income) => income.id !== action.payload.id
            );

            state.incomes = newList;
        },
        updateIncome: (
            state,
            action: PayloadAction<{ id: string; income: IncomeAddState }>
        ) => {
            const incomeIndex = state.incomes.findIndex(
                (income) => income.id === action.payload.id
            );

            const updatableIncome = state.incomes[incomeIndex];

            const updatedItem = { ...updatableIncome, ...action.payload.income };

            state.incomes[incomeIndex] = updatedItem;
        },
        doNothing: (state) => {
            const expList = [...state.incomes];
            state.incomes = expList;
        },
    },
});

export const { addIncome, resetIncome, deleteIncome, updateIncome, doNothing, setIncome } =
    incomeSlice.actions;
export default incomeSlice.reducer;
