import { useAuth } from "@providers/AuthProvider";
import { toastError, toastSuccess } from "@providers/ToastProvider";
import { API_URL } from "@services/apiUrls";
import axiosInstance from "@services/axiosInstance";
import type { IUser } from "types/user";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useSignin() {
  // *@ Component Hooks
  const { login } = useAuth();
  const navigate = useNavigate();

  // *@ Component States
  const [tab, setTab] = useState(0);

  // * Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // *@ Component Functions
  // * Handle Tab Change
  const handleChange = useCallback(
    (_: React.SyntheticEvent, newValue: number) => {
      setTab(newValue);
      setEmail("");
      setPassword("");
      setFullName("");
    },
    []
  );

  // * Handle SignIn
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (tab === 0) {
        /// Login
        const res = await axiosInstance.get<IUser[]>(API_URL.user, {
          params: { email, password },
        });

        if (!res.data || res.data.length === 0) {
          toastError("Wrong credentials");
          return;
        }

        const user = res.data[0];

        login({
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          token: user.email,
        });

        navigate("/home");
      } else {
        // Signup
        const res = await axiosInstance.post<IUser>(API_URL.user, {
          fullName,
          email,
          password,
        });

        const newUser = res.data;

        login({
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          token: newUser.email,
        });

        toastSuccess("Account created successfully!");
        navigate("/home");
      }
    } catch (err: any) {
      toast.error("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return {
    tab,
    email,
    fullName,
    password,

    setEmail,
    setPassword,
    setFullName,
    handleChange,
    handleSignIn,
  };
}
