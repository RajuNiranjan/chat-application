import {
  authFailure,
  authStart,
  authSuccess,
} from "@/redux/reducers/auth.reducer";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "./use-toast";
import { useNavigate } from "react-router-dom";

interface LogInProps {
  userName: string;
  password: string;
}

export const useLogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async ({ userName, password }: LogInProps) => {
    const success = handleInputErrors({ userName, password });
    if (!success) return;
    dispatch(authStart());
    try {
      const res = await axios.post("/api/auth/login", {
        userName,
        password,
      });
      localStorage.setItem("token", res.data.token);
      dispatch(authSuccess(res.data.token));
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch(authFailure((error as Error).message));
    }
  };

  return { login };
};

const handleInputErrors = ({ userName, password }: LogInProps) => {
  if (!userName || !password) {
    toast({
      title: "All fileds are required",
      duration: 1000,
    });
  }
  return true;
};
