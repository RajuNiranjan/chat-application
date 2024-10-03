import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  _id: string;
  userName: string;
  fullName: string;
  gender: string;
  profilePic: string;
}

interface AuthState {
  loading: boolean;
  error: null | string;
  token: string | null;
  user: null | User;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  token: null,
  user: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token: string) => {
    const res = await axios.get("/api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.user;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(fetchUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { authFailure, authStart, authSuccess } = authSlice.actions;

export default authSlice.reducer;
