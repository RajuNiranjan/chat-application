import {
  userFailure,
  userStart,
  userSuccess,
} from "@/redux/reducers/allUsers.reducer";
import axios from "axios";
import { useDispatch } from "react-redux";

export const useFetchAllUsers = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetchAllUser = async (token: any) => {
    if (!token) return;
    dispatch(userStart());
    try {
      const res = await axios.get("/api/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(userSuccess(res.data.users));
    } catch (error) {
      dispatch(userFailure((error as Error).message));
      console.error(error);
    }
  };

  return { fetchAllUser };
};
