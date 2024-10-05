import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Message } from "@/redux/reducers/conversations.reducer";

const ConversationChat = ({ messages }: { messages: Message }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div>
          <img
            src={user?.profilePic}
            alt=""
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div>
          <small className="opacity-50">@{user?.userName}</small>
          <div className="min-w-[50%] h-max bg-sky-500 p-2 rounded-r-xl rounded-bl-xl ">
            <small>{messages.message}</small>
          </div>
          <small className="w-[60%] opacity-50 text-[10px] float-end">
            08:59pm
          </small>
        </div>
      </div>
    </div>
  );
};

export default ConversationChat;
