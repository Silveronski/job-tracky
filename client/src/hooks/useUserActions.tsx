import { useEffect } from "react";
import { api, setAuthToken } from "../api/api-config";
import { useAuthContext } from "../context/AuthContext";
import asyncWrapper from "../utils/asyncWrapper";

interface UpdateProfileProps {
    
}

export const useUserActions = () => {
    const { user, signOut } = useAuthContext(); 

    const deleteAccount = asyncWrapper(async (): Promise<void> => {      
        await api.post<string>('/user/delete-account', null);
        signOut();    
    });

    const updateProfile = async (): Promise<void> => {
        
    };

    useEffect(() => {
        setAuthToken(user?.token);
    }, [user]);

    return { deleteAccount, updateProfile };
}