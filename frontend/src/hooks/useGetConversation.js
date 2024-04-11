import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const getConversation = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/users");
      if (res.data.error) throw new Error(res.data.error);
      setConversations(res?.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversation();
  }, []);

  return { loading, conversations };
};

export default useGetConversation;
