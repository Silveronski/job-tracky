import { createContext, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { CurrentUser, AuthApiResponse, UserAuth, UserRegister, ResetPassword } from '../types/authTypes';

interface AuthContextProviderProps {
    children: ReactNode; 
};

interface AuthContextType {
    user: CurrentUser,
    loading: boolean,
    register: (user: UserRegister) => Promise<AuthApiResponse>,
    login: (user: UserAuth) => Promise<AuthApiResponse>,
    verifyVerificationCode: (verificationCode: string, email: string) => Promise<AuthApiResponse>,
    forgotPassword: (email: string) => Promise<AuthApiResponse>,
    resetPassword: (userData: ResetPassword) => Promise<AuthApiResponse>,
    signOut: () => void
};

const defaultState: AuthContextType = {
    user: {
        name: "",
        token: null
    },
    loading: true,
    register: () => Promise.resolve<AuthApiResponse>(""),
    login: () => Promise.resolve<AuthApiResponse>(""),
    verifyVerificationCode: () => Promise.resolve<AuthApiResponse>(""),
    signOut: () => {},
    forgotPassword: () => Promise.resolve<AuthApiResponse>(""),
    resetPassword: () => Promise.resolve<AuthApiResponse>(""),
};

export const AuthContext = createContext<AuthContextType>(defaultState);
   
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const { 
        user,
        loading,
        register,
        login,
        verifyVerificationCode,
        signOut, 
        forgotPassword, 
        resetPassword 
    } = useAuth();
    return (
        <AuthContext.Provider value={{ user, loading, register, login, verifyVerificationCode,
                                        signOut, forgotPassword, resetPassword}}>                                       
            {children}
        </AuthContext.Provider>
    )
};