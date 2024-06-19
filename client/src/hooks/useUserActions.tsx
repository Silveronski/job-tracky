import { useEffect } from "react";
import { api, setAuthToken } from "../api/api-config";
import { useAuthContext } from "../context/AuthContext";

interface UpdateProfileProps {
    
}

export const useUserActions = () => {
    const { user, signOut } = useAuthContext();

    const deleteAccount = async (): Promise<void> => {
        try {
            await api.post<string>('/user/delete-account', null);
            signOut();
        } 
        catch (error) {
            console.log(error);
            throw error;
        }        
    };

    const updateProfile = async (): Promise<void> => {
        
    };

    useEffect(() => {
        setAuthToken(user?.token);
    }, [user]);

    return { deleteAccount, updateProfile };
}