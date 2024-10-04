import axios from "axios";
import { toast } from "./use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  messageFalure,
  messageStart,
  messageSuccess,
} from "@/redux/reducers/message.reducer";

export const useSendMessage = () => {
  const token = localStorage.getItem("token");
  const { selectedUserId } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const sendMessage = async (message: string) => {
    if (!message) return;
    dispatch(messageStart());
    try {
      const res = await axios.post(
        `/api/message/send/${selectedUserId}`,
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(messageSuccess(res.data.message.message));
    } catch (error) {
      console.log(error);
      dispatch(messageFalure((error as Error).message));
      toast({
        title: "message did't send",
        duration: 1000,
      });
    }
  };
  return { sendMessage };
};
