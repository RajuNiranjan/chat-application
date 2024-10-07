import { useEffect } from "react";
import { setOnlineUsers, setSocket } from "@/redux/reducers/socket.reducer";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const userId = user?._id;

  useEffect(() => {
    if (userId) {
      const socket: Socket = io("http://localhost:5000", {
        query: { userId },
      });

      // socket.on("connect", () => {
      //   console.log("connected with socket id:", socket.id);
      // });

      dispatch(setSocket(socket));

      socket.on("getOnlineUsers", (users: string[]) => {
        dispatch(setOnlineUsers(users));
      });

      return () => {
        socket.close();
        dispatch(setSocket(null));
      };
    }
  }, [userId, dispatch]);

  return null;
};
