import {
  conversationFailure,
  conversationSuccess,
  conversationStart,
} from "@/redux/reducers/conversations.reducer";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useFetchConversations = () => {
  const dispatch = useDispatch();

  const fetchConversations = async ({
    token,
    selectedUserId,
  }: {
    token: string;
    selectedUserId: string;
  }) => {
    if (!selectedUserId) return;
    dispatch(conversationStart());
    try {
      const res = await axios.get(`/api/message/${selectedUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(conversationSuccess(res.data.messages));
    } catch (error) {
      dispatch(conversationFailure((error as Error).message));
      console.log(error);
    }
  };

  return { fetchConversations };
};
