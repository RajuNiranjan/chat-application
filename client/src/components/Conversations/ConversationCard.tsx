import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ConversationInputForm from "./conversationInputForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ConversationChat from "./conversationChat";
import { ArrowLeft } from "lucide-react";
import { unSelectedUser } from "@/redux/reducers/allUsers.reducer";
import { useFetchConversations } from "@/hooks/useFetchConversations";
import { useEffect, useRef } from "react";
import MessageSkeleton from "@/skeleton/message.skeleton";

const ConversationCard = () => {
  const { users, selectedUser } = useSelector(
    (state: RootState) => state.users
  );

  const selectedUserData = users?.find(
    (user) => user._id === selectedUser?._id
  );

  const dispatch = useDispatch();

  const back = () => {
    dispatch(unSelectedUser());
  };

  const { messages, loading } = useSelector(
    (state: RootState) => state.conversation
  );

  const token = localStorage.getItem("token");

  const { fetchConversations } = useFetchConversations();

  const isFetchingRef = useRef(false);

  useEffect(() => {
    const fetch = async () => {
      if (token && selectedUser?._id && !isFetchingRef.current) {
        isFetchingRef.current = true;

        try {
          await fetchConversations({
            token,
            selectedUserId: selectedUser?._id,
          });
        } finally {
          isFetchingRef.current = false;
        }
      }
    };
    fetch();
  }, [token, selectedUser, fetchConversations]);

  return (
    <Card className="w-full h-full bg-transparent border-none shadow-none  text- flex flex-col ">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <ArrowLeft size={16} onClick={back} className="cursor-pointer" />
            <div className="flex items-center gap-2">
              <div>
                <img
                  src={selectedUserData?.profilePic}
                  alt="user_pic"
                  className="w-7 h-7"
                />
              </div>
              <div>
                <h1>{selectedUserData?.userName}</h1>
                <small>last seen 08:59 pm</small>
              </div>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full p-1 space-y-2  overflow-auto">
        {messages.length === 0 ? (
          <div className="h-full flex justify-center items-center">
            sent a message
          </div>
        ) : loading ? (
          [...Array(6)].map((_, idx) => <MessageSkeleton key={idx} />)
        ) : (
          messages.map((msg, idx) => (
            <ConversationChat key={idx} messages={msg} />
          ))
        )}
      </CardContent>
      <CardFooter className="w-full">
        <ConversationInputForm />
      </CardFooter>
    </Card>
  );
};

export default ConversationCard;
