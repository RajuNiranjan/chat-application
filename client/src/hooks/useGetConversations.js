import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useGetConversations = () => {
  const [loading, setloading] = useState(false);
  const [conversations, setconversations] = useState([]);

  const token = localStorage.getItem("token");

  const fetchConversations = async () => {
    try {
      const res = await axios.get("/api/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.allUsers;
      setconversations(data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [token]);

  return { loading, conversations };
};

export default useGetConversations;
