import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  error: null | string;
  token: string | null;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
    },
    authFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    authSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
    },
  },
});

export const { authFailure, authStart, authSuccess } = authSlice.actions;

export default authSlice.reducer;
