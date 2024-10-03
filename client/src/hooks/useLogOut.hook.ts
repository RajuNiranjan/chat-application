import { logout } from "@/redux/reducers/auth.reducer";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useLogOut = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/login");
  };
  return { logOut };
};
