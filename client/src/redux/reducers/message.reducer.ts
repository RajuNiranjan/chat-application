import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  message: string;
}

interface MessageState {
  loading: boolean;
  message: Message | null;
  error: string | null;
}

const initialState: MessageState = {
  loading: false,
  error: null,
  message: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    messageStart: (state) => {
      state.loading = true;
    },
    messageSuccess: (state, action: PayloadAction<Message>) => {
      state.message = action.payload;
      state.loading = false;
    },
    messageFalure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { messageFalure, messageStart, messageSuccess } =
  messageSlice.actions;

export default messageSlice.reducer;
