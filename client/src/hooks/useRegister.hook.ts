import {
  authFailure,
  authStart,
  authSuccess,
} from "@/redux/reducers/auth.reducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

interface RegisterProps {
  fullName: string;
  userName: string;
  gender: string;
  password: string;
}

export const useRegister = () => {
  const dispatch = useDispatch();

  const register = async ({
    fullName,
    userName,
    gender,
    password,
  }: RegisterProps) => {
    if (!handleFieldError({ fullName, userName, gender, password })) return;

    dispatch(authStart());
    try {
      const res = await axios.post(`/api/auth/register`, {
        fullName,
        userName,
        password,
        gender,
      });
      localStorage.setItem("token", res.data.token);
      dispatch(authSuccess(res.data.token));
    } catch (error) {
      dispatch(authFailure((error as Error).message));
    }
  };

  return { register };
};

const handleFieldError = ({
  fullName,
  userName,
  password,
  gender,
}: RegisterProps) => {
  if (!fullName || !userName || !password || !gender) {
    toast({
      title: "All fields are required",
      duration: 1000,
    });
    return false;
  }
  return true;
};
