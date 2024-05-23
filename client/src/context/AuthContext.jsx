import { createContext } from "react";
import { useAuth } from "../hooks/useAuth";

export const AuthContext = createContext({
    user: {},
    loading: true,
    register: async () => {},
    login: async () => {},
    getJobs: async () => {},
});

export const AuthContextProvider = ({ children }) => {
    const { user, loading, register, login, getJobs } = useAuth();
    return (
        <AuthContext.Provider value={{ user, loading, register, login, getJobs }}>
            {children}
        </AuthContext.Provider>
    )
}