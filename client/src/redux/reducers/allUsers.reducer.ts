import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  _id: string;
  userName: string;
  fullName: string;
  gender: string;
  profilePic: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserState {
  loading: boolean;
  error: string | null;
  users: User[] | null;
  selectedUser: null | User;
}

const initialState: UserState = {
  loading: false,
  error: null,
  users: null,
  selectedUser: null,
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
    selectedUserData: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    unSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
});
export const {
  userFailure,
  userStart,
  userSuccess,
  selectedUserData,
  unSelectedUser,
} = UserSlice.actions;
export default UserSlice.reducer;
