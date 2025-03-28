import { useEffect, useState } from "react";
import { api } from "../api/api-config";
import asyncWrapper from "../utils/asyncWrapper";

export const useAuth = () => {
  const [user, setUser] = useState<CurrentUser>({
    name: "",
    token: null,
    avatar: null,
  });
  const [loading, setLoading] = useState<boolean>(true);

  const register = asyncWrapper(async (user: FormData): Promise<void> => {
    await api.post<string>("/auth/register", user);
  });

  const verifyVerificationCode = asyncWrapper(
    async (verificationCode: string, email: string): Promise<void> => {
      const response = await api.post<CurrentUser>("/auth/verify-email", {
        verificationCode,
        email,
      });
      storeUser({
        name: response.data?.name,
        token: response.data?.token,
        avatar: response.data?.avatar,
      });
    }
  );

  const login = asyncWrapper(async (user: UserAuth): Promise<void> => {
    const response = await api.post<CurrentUser>("/auth/login", user);
    storeUser({
      name: response.data?.name,
      token: response.data?.token,
      avatar: response.data?.avatar,
    });
  });

  const forgotPassword = asyncWrapper(async (email: string): Promise<void> => {
    await api.post<string>("/auth/forgot-password", { email });
  });

  const resetPassword = asyncWrapper(
    async (userData: ResetPassword): Promise<void> => {
      await api.post<string>("/auth/reset-password", userData);
    }
  );

  const signOut = (): void => {
    localStorage.getItem("userData") && localStorage.removeItem("userData");
    setUser({ name: "", token: null, avatar: null });
  };

  const checkToken = async (): Promise<void> => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const validUser = await verifyUser(parsedUserData.token);
      if (validUser)
        setUser({
          name: validUser.name,
          token: validUser.token,
          avatar: validUser.avatar,
        });
      else signOut();
    }
    setLoading(false);
  };

  const verifyUser = async (token: string): Promise<CurrentUser | null> => {
    try {
      const response = await api.post<CurrentUser>("/auth/verify-token", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data || null;
    } catch (error) {
      console.error("error validating token", error);
      return null;
    }
  };

  const storeUser = (user: CurrentUser): void => {
    setUser(user);
    localStorage.setItem("userData", JSON.stringify(user));
  };

  useEffect(() => {
    checkToken();
  }, []);

  return {
    user,
    loading,
    register,
    login,
    verifyVerificationCode,
    signOut,
    forgotPassword,
    resetPassword,
  };
};
