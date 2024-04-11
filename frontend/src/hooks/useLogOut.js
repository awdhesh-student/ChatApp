import axios from "axios";
import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogOut = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res?.data.error) {
        throw new Error(res.data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogOut;
