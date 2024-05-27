import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext({
    user: {},
    loading: true,
    register: async () => {},
    login: async () => {},
    signOut: () => {}
});

export const AuthContextProvider = ({ children }) => {
    const { user, loading, register, login, signOut } = useAuth();
    return (
        <AuthContext.Provider value={{ user, loading, register, login, signOut}}>                                       
            {children}
        </AuthContext.Provider>
    )
}