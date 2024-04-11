import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();
  const login = async (username, password) => {
    // console.log(username, password);
    if (!username || !password) return toast.error("enter credential");
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/login",
        { username, password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res?.data?.error) {
        throw new Error(res?.data?.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(res.data));
      setAuthUser(res.data);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
