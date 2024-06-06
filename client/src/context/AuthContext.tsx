import { createContext, ReactNode } from "react";
import { useAuth } from "../hooks/useAuth";
import { CurrentUser, UserAuth, UserRegister, ResetPassword } from '../types/authTypes';

interface AuthContextProviderProps {
    children: ReactNode; 
};

interface AuthContextType {
    user: CurrentUser,
    loading: boolean,
    register: (user: UserRegister) => Promise<void>,
    login: (user: UserAuth) => Promise<void>,
    verifyVerificationCode: (verificationCode: string, email: string) => Promise<void>,
    forgotPassword: (email: string) => Promise<void>,
    resetPassword: (userData: ResetPassword) => Promise<void>,
    signOut: () => void,
};

const defaultState: AuthContextType = {
    user: {
        name: "",
        token: null
    },
    loading: true,
    register: async () => {},
    login: async () => {},
    verifyVerificationCode: async () => {},
    forgotPassword: async () => {},
    resetPassword: async () => {},
    signOut: () => {},
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