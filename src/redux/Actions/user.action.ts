import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  currentUser: null | any;
  loading: boolean;
  error: null;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AuthStart: (state) => {
      state.currentUser = null;
      state.loading = true;
      state.error = null;
    },
    AuthSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    AuthFailure: (state, action: PayloadAction<any>) => {
      state.currentUser = null;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { AuthFailure, AuthStart, AuthSuccess } = userSlice.actions;
export default userSlice.reducer;
