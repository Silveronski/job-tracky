import { createContext, ReactNode, useContext } from "react";
import { useAuth } from "../hooks/useAuth";

interface AuthContextProviderProps {
    children: ReactNode; 
};

interface AuthContextType {
    user: CurrentUser,
    loading: boolean,
};

export const AuthContext = createContext<AuthContextType | null>(null);
   
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const { user, loading} = useAuth();
         
    return (
        <AuthContext.Provider value={{ user, loading }}>                                       
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