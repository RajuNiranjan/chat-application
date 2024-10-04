import { RootState } from "@/redux/store";
import MessageSkeleton from "@/skeleton/message.skeleton";
import { useSelector } from "react-redux";

const ConversationChat = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex flex-col gap-2">
      <MessageSkeleton />
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
          <div className="max-w-[50%] bg-sky-500 p-2 rounded-r-xl rounded-bl-xl ">
            <small>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quasi
              impedit ad,
            </small>
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
