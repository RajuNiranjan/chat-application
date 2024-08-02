import { RootState } from "../redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return currentUser.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
