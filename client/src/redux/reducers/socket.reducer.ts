import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  onlineUsers: string[];
}

const initialState: SocketState = {
  socket: null,
  onlineUsers: [],
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<Socket | null>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state.socket = action.payload as any;
    },
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },
    resetSocket: (state) => {
      if (state.socket) {
        state.socket.close();
      }
      state.socket = null;
      state.onlineUsers = [];
    },
  },
});

export const { setOnlineUsers, resetSocket, setSocket } = socketSlice.actions;

export default socketSlice.reducer;
