import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    if (!token) {
      return;
    }

    try {
      const res = await axios.get(`/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data.user;
      setAuthUser(data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ authUser }}>{children}</AuthContext.Provider>
  );
};
