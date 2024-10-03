import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchAllUsers } from "@/hooks/useFetchAllUsers.hook";
import { useLogOut } from "@/hooks/useLogOut.hook";
import { RootState } from "@/redux/store";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MessageCard = () => {
  const { logOut } = useLogOut();

  const handleLogOut = () => {
    logOut();
  };

  const { users } = useSelector((state: RootState) => state.users);
  const token = localStorage.getItem("token");

  const { fetchAllUser } = useFetchAllUsers();

  useEffect(() => {
    fetchAllUser(token);
  }, [token]);

  return (
    <Card className="w-full h-full bg-transparent border border-r shadow-lg  text- flex flex-col ">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="h-full p-1 space-y-2  overflow-auto">
        {users?.map((users, idx) => (
          <div
            key={idx}
            className="flex w-full hover:bg-sky-500 transition-all   duration-300 rounded-lg p-2 gap-2 cursor-pointer">
            <div>
              <img
                src={users?.profilePic}
                alt="uses_pic"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div>{users?.userName}</div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-end">
        <LogOut onClick={handleLogOut} className="cursor-pointer " />
      </CardFooter>
    </Card>
  );
};

export default MessageCard;
