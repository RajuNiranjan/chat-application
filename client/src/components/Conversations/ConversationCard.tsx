import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ConversationInputForm from "./conversationInputForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ConversationChat from "./conversationChat";

const ConversationCard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Card className="w-full h-full bg-transparent border-none shadow-none  text- flex flex-col ">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <div>
              <img src={user?.profilePic} alt="user_pic" className="w-7 h-7" />
            </div>
            <div>
              <h1>{user?.userName}</h1>
              <small>last seen 08:59 pm</small>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full p-1 space-y-2  overflow-auto">
        <ConversationChat />
      </CardContent>
      <CardFooter className="w-full">
        <ConversationInputForm />
      </CardFooter>
    </Card>
  );
};

export default ConversationCard;
