import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchAllUsers } from "@/hooks/useFetchAllUsers.hook";
import { useLogOut } from "@/hooks/useLogOut.hook";
import { RootState } from "@/redux/store";
import { LogOut } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedUserData } from "@/redux/reducers/allUsers.reducer";
import ChatSkeleton from "@/skeleton/chat.skeleton";

const MessageCard = () => {
  const { logOut } = useLogOut();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    logOut();
  };

  const { users, selectedUser, loading } = useSelector(
    (state: RootState) => state.users
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const token = localStorage.getItem("token");

  const { fetchAllUser } = useFetchAllUsers();

  useEffect(() => {
    fetchAllUser(token);
  }, [token]);

  const selectedUserId = (id: string) => {
    const selectedUserInfo = users?.find((user) => user._id === id);
    if (selectedUserInfo) {
      dispatch(selectedUserData(selectedUserInfo));
    }
  };

  return (
    <Card className="w-full h-full bg-transparent border border-r shadow-lg text flex flex-col ">
      <CardHeader>
        <CardTitle className="flex gap-2">
          welcome back: <i className="text-sky-500 ">{user?.userName}</i>{" "}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full p-1 space-y-2  overflow-auto">
        {loading
          ? [...Array(10)].map((_, idx) => <ChatSkeleton key={idx} />)
          : users?.map((users, idx) => (
              <div
                key={idx}
                onClick={() => selectedUserId(users._id)}
                className={`flex w-full hover:bg-sky-500 ${
                  selectedUser?._id === users._id ? "bg-sky-500" : ""
                } transition-all text-white  duration-300 rounded-lg p-2 gap-2 cursor-pointer`}
              >
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
