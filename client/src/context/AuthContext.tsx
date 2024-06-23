import { createContext, ReactNode, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

interface AuthContextProviderProps {
    children: ReactNode; 
};

interface AuthContextType {
    user: CurrentUser,
    loading: boolean,
    register: (user: FormData) => Promise<void>,
    login: (user: UserAuth) => Promise<void>,
    verifyVerificationCode: (verificationCode: string, email: string) => Promise<void>,
    forgotPassword: (email: string) => Promise<void>,
    resetPassword: (userData: ResetPassword) => Promise<void>,
    signOut: () => void
};

export const AuthContext = createContext<AuthContextType | null>(null);
   
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

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('AuthContext must be used within a AuthContextProvider');
    }
    return context;
};