import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext({
    user: {},
    loading: true,
    register: async () => {},
    login: async () => {},
    verifyVerificationCode: async () => {},
    signOut: () => {},
    forgotPassword: async () => {},
    resetPassword: async () => {},
});

export const AuthContextProvider = ({ children }) => {
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