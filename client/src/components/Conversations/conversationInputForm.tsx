import { Loader2, Send } from "lucide-react";
import { Input } from "../ui/input";
import { useState, FormEvent } from "react";
import { Button } from "../ui/button";
import { useSendMessage } from "@/hooks/useSendMessage.hook";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ConversationInputForm = () => {
  const [message, setMessage] = useState<string>("");
  const { sendMessage } = useSendMessage();
  const { loading } = useSelector((state: RootState) => state.message);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  };

  return (
    <div className="w-full ">
      <form onSubmit={handleSendMessage} className="relative">
        <Input
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="send a message..."
          className="w-full rounded-full pr-10 outline-none shadow-none"
        />
        <Button
          type="submit"
          className="absolute bg-transparent right-0 top-0 hover:bg-transparent"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ConversationInputForm;
