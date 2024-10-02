import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useSingUp = () => {
  const [loading, setLoading] = useState(false);

  const signup = async ({ fullName, userName, password, gender }) => {
    const success = handleInputError({ fullName, userName, password, gender });
    if (!success) return;

    try {
      const res = await axios.post(`/api/auth/register`, {
        fullName,
        userName,
        password,
        gender,
      });
      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }
      console.log("token", data.token);

      localStorage.setItem("token", data.token);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSingUp;

const handleInputError = ({ fullName, userName, password, gender }) => {
  if (!fullName || !userName || !password || !gender) {
    toast.error("Please fill in all fields");
  }

  return true;
};
