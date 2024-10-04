import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
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
  error: string | null;
}

const initialState: MessageState = {
  error: null,
  loading: false,
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
      state.error = action.payload;
      state.loading = false;
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
