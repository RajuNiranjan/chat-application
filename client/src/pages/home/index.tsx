import ConversationCard from "@/components/Conversations/ConversationCard";
import MessageCard from "@/components/message/MessageCard/MessageCard";
import { Card, CardContent } from "@/components/ui/card";
import { RootState } from "@/redux/store";

import { useSelector } from "react-redux";

const Home = () => {
  const { selectedUser } = useSelector((state: RootState) => state.users);
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="h-[100vh] w-full flex justify-center items-center font-bold text-white ">
      <Card className="bg-transparent text-white w-[100%] h-[500px] max-w-[90%] lg:max-w-[60%] p-0 backdrop-filter backdrop-blur-sm shadow-md">
        <CardContent className="flex p-0 h-full ">
          <div className="w-[40%] h-full">
            <MessageCard />
          </div>
          <div className="w-[60%] h-full ">
            {selectedUser ? (
              <ConversationCard />
            ) : (
              <div className="h-full flex justify-center items-center opacity-50 flex-col">
                <h1>Welcome back {user?.fullName}</h1>
                <small>start new conversation</small>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
