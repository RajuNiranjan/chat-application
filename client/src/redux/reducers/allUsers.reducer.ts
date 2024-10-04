import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  userName: string;
  fullName: string;
  profilePic: string;
}

interface UserState {
  loading: boolean;
  error: string | null;
  users: User[] | null;
  selectedUserId: null | string;
}

const initialState: UserState = {
  loading: false,
  error: null,
  users: null,
  selectedUserId: null,
};

const UserSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {
    userStart: (state) => {
      state.loading = true;
    },
    userFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    userSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false;
      state.users = action.payload;
    },
    selectedUser: (state, action: PayloadAction<string>) => {
      state.selectedUserId = action.payload;
    },
    unSelectedUser: (state) => {
      state.selectedUserId = null;
    },
  },
});
export const {
  userFailure,
  userStart,
  userSuccess,
  selectedUser,
  unSelectedUser,
} = UserSlice.actions;
export default UserSlice.reducer;
