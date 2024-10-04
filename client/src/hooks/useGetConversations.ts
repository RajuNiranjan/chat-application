import { useDispatch, useSelector } from "react-redux";
import {
  conversationFailure,
  conversationStart,
  conversationSuccess,
} from "@/redux/reducers/conversations.reducer";
import { RootState } from "@/redux/store";
import axios from "axios";

export const useGetConversations = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { selectedUserId } = useSelector((state: RootState) => state.users);

  const conversations = async () => {
    dispatch(conversationStart());
    try {
      const res = await axios.get(`/api/message/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(conversationSuccess(res.data.messages));
    } catch (error) {
      console.log(error);
      dispatch(conversationFailure((error as Error).message));
    }
  };

  return { conversations };
};
