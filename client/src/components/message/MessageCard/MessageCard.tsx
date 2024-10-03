import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLogOut } from "@/hooks/useLogOut.hook";
import { LogOut } from "lucide-react";

const MessageCard = () => {
  const { logOut } = useLogOut();

  const handleLogOut = () => {
    logOut();
  };

  return (
    <Card className="w-full h-full bg-transparent border border-r shadow-lg  text- flex flex-col ">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="h-full overflow-auto">
        <p>Card Content</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <LogOut onClick={handleLogOut} className="cursor-pointer " />
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
