import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async ({ userName, password }) => {
    // Handle input validation
    const success = handleInputError({ userName, password });
    if (!success) return;

    setLoading(true);

    try {
      const res = await axios.post(`/api/auth/login`, {
        userName,
        password,
      });
      const data = res.data;

      if (data.error) {
        throw new Error(data.error);
      }

      console.log("token", data.token);

      // Store the token in localStorage
      localStorage.setItem("token", data.token);

      // You could display a success message
      toast.success("Login successful");
      navigate("/home");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

// Handle input validation for login
const handleInputError = ({ userName, password }) => {
  if (!userName || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
};
