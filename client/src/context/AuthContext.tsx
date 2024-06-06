import { createContext, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { CurrentUser, AuthResponse, UserAuth, UserRegister, ResetPassword } from '../types/types';

interface AuthContextProviderProps {
    children: ReactNode; 
};

interface AuthContextType {
    user: CurrentUser,
    loading: boolean,
    register: (user: UserRegister) => Promise<AuthResponse>,
    login: (user: UserAuth) => Promise<AuthResponse>,
    verifyVerificationCode: (verificationCode: string, email: string) => Promise<AuthResponse>,
    forgotPassword: (email: string) => Promise<AuthResponse>,
    resetPassword: (userData: ResetPassword) => Promise<AuthResponse>,
    signOut: () => void
};

const defaultState: AuthContextType = {
    user: {
        name: "",
        token: null
    },
    loading: true,
    register: () => Promise.resolve<AuthResponse>(""),
    login: () => Promise.resolve<AuthResponse>(""),
    verifyVerificationCode: () => Promise.resolve<AuthResponse>(""),
    signOut: () => {},
    forgotPassword: () => Promise.resolve<AuthResponse>(""),
    resetPassword: () => Promise.resolve<AuthResponse>(""),
}

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
}