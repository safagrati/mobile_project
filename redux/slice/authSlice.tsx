import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type authType = {
  token: string | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
  } as authType,
  reducers: {
    auth: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
    },
  },
});
