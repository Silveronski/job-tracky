import { useEffect, useState } from 'react';
import { api } from '../api/api-config';
import { CurrentUser, UserAuth, UserRegister, ResetPassword } from '../types/authTypes';

export const useAuth = () => {
    const [user, setUser] = useState<CurrentUser>({ name: '', token: null });
    const [loading, setLoading] = useState<boolean>(true);
    
    const register = async (user: UserRegister): Promise<void> => {
        try {
            await api.post<string>('/auth/register', user);                         
        } 
        catch (error) {
            console.error('error registering user', error);
            throw error;
        }
    }

    const verifyVerificationCode = async (verificationCode: string, email: string): Promise<void> => {
        try {
            const response = await api.post<CurrentUser>('/auth/verify-email', { verificationCode, email });         
            storeUser({ name: response?.data?.name, token: response?.data?.token });         
        } 
        catch (error) {
            console.error('error verifying code', error);
            throw error;
        }
    }

    const login = async (user: UserAuth): Promise<void> => {
        try {
            const response = await api.post<CurrentUser>('/auth/login', user);          
            storeUser({ name: response?.data?.name, token: response?.data.token });           
        } 
        catch (error) {
            console.error('error in user login', error);
            throw error;
        }
    }

    const forgotPassword = async (email: string): Promise<void> => {
        try {
            await api.post<string>('/auth/forgot-password', { email });
        } 
        catch (error) {
            console.error('error in forgot password', error);
            throw error;
        }
    }

    const resetPassword = async (userData: ResetPassword): Promise<void> => {
        try {
            await api.post<string>('/auth/reset-password', { userData });
        } 
        catch (error) {
            console.error('error in password reset', error);
            throw error;
        }
    }

    const signOut = (): void => {
        localStorage.getItem('userData') && localStorage.removeItem('userData');
        setUser({ name: '', token: null });
    }

    const checkToken = async (): Promise<void> => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            const parsedUserData = JSON.parse(userData);
            const validUser = await verifyUser(parsedUserData.token);
            if (validUser) setUser({ name: validUser.name, token: validUser.token });                         
            else signOut();                     
        }      
        setLoading(false);
    }

    const verifyUser = async (token: string): Promise<CurrentUser | null> => {
        try {
            const response = await api.post<CurrentUser>('/auth/verify-token', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response?.data || null;                      
        } 
        catch (error) {
            console.error('error validating token', error);
            return null;
        }
    }

    const storeUser = (user: CurrentUser): void => {
        setUser(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    useEffect(() => {      
        checkToken();
    },[]);

    return { 
        user,
        loading,
        register,
        login,
        verifyVerificationCode,
        signOut,
        forgotPassword,
        resetPassword
    };
}