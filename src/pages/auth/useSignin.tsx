import { useAuth } from "@providers/AuthProvider";
import { toastError, toastSuccess } from "@providers/ToastProvider";
import { API_URL } from "@services/apiUrls";
import axiosInstance from "@services/axiosInstance";
import { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { IUser } from "types/user";

export function useSignin() {
  // *@ Component Hooks
  const { login } = useAuth();
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  // *@ Component States
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      if (tab === 0) {
        /// Login
        const res = await axiosInstance.get<IUser[]>(API_URL.user, {
          params: { email, password },
        });

        if (!res.data || res.data.length === 0) {
          toastError(formatMessage({ id: "toast.wrongCredentials" }));
          setIsLoading(false);
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

        toastSuccess(formatMessage({ id: "toast.createAccount.success" }));
        navigate("/home");
      }
    } catch (err: any) {
      toast.error(formatMessage({ id: "toast.createAccount.error" }));
      console.error(err);
    }
    setIsLoading(false);
  };

  return {
    tab,
    email,
    fullName,
    password,
    isLoading,

    setEmail,
    setPassword,
    setFullName,
    handleChange,
    handleSignIn,
  };
}
