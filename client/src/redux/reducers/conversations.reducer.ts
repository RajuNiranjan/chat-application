import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

interface MessageState {
  messages: Message[];
  loading: boolean;
  error: null | string;
}

const initialState: MessageState = {
  loading: false,
  error: null,
  messages: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    conversationStart: (state) => {
      state.loading = true;
    },
    conversationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    conversationSuccess: (state, action: PayloadAction<Message[]>) => {
      state.loading = false;
      state.messages = action.payload;
    },
  },
});

export const { conversationFailure, conversationStart, conversationSuccess } =
  conversationSlice.actions;
export default conversationSlice.reducer;
