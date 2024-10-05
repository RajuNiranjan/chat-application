import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Message } from "@/redux/reducers/conversations.reducer";

const ConversationChat = ({ messages }: { messages: Message }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { selectedUser } = useSelector((state: RootState) => state.users);

  const fromMe = messages.senderId === user?._id;
  const date = new Date(messages.updatedAt);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = parseInt(hours) >= 12 ? "pm" : "am";

  const formattedHours = (parseInt(hours) % 12 || 12)
    .toString()
    .padStart(2, "0");

  const formateTime = `${formattedHours}:${minutes} ${period}`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div>
          <img
            src={fromMe ? user?.profilePic : selectedUser?.profilePic}
            alt=""
            className="w-10 h-10 rounded-full"
          />
        </div>
        <div>
          <small className="opacity-50">
            @{fromMe ? user?.userName : selectedUser?.userName}
          </small>
          <div
            className={`min-w-[50%] h-max ${
              fromMe ? "bg-gray-500" : "bg-sky-500"
            } p-2 rounded-r-xl rounded-bl-xl `}
          >
            <small>{messages.message}</small>
          </div>
          <small className="w-[100%] opacity-50 text-[10px] float-end">
            {formateTime}
          </small>
        </div>
      </div>
    </div>
  );
};

export default ConversationChat;
