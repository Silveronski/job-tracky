import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext({
    user: {},
    loading: true,
    register: async () => {},
    login: async () => {},
    verifyVerificationCode: async () => {},
    signOut: () => {}
});

export const AuthContextProvider = ({ children }) => {
    const { user, loading, register, login, verifyVerificationCode, signOut } = useAuth();
    return (
        <AuthContext.Provider value={{ user, loading, register, login, verifyVerificationCode, signOut}}>                                       
            {children}
        </AuthContext.Provider>
    )
}