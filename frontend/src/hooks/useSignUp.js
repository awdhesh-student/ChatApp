import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signUp = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    if (!fullName || !username || !password || !confirmPassword)
      return toast.error("Please fill all fields");

    if (password !== confirmPassword)
      return toast.error("Passwords do not match!");

    if (password.length < 8)
      return toast.error("Password must be at least 8 characters long");

    setLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/signup",
        { fullName, username, password, confirmPassword, gender },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res?.data.error) {
        throw new Error(res.data.error);
      } else {
        localStorage.setItem("chat-user", JSON.stringify(res?.data));
        setAuthUser(res?.data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { signUp, loading };
};

export default useSignUp;
