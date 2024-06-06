import { useEffect, useState } from 'react';
import { api } from '../api/api-config';
import { CurrentUser, AuthResponse, UserAuth, UserRegister, ResetPassword } from '../types/types';

export const useAuth = () => {
    const [user, setUser] = useState<CurrentUser>({ name: '', token: null });
    const [loading, setLoading] = useState<boolean>(true);
    
    const register = async (user: UserRegister): Promise<AuthResponse> => {
        try {
            const response = await api.post('/auth/register', user);
            if (response?.data) return response.data.msg;                          
        } 
        catch (error) {
            console.error('error registering user', error);
            return error as object; // maybe need to chnage this, check if this axios error!
        }
    }

    const verifyVerificationCode = async (verificationCode: string, email: string): Promise<AuthResponse> => {
        try {
            const response = await api.post('/auth/verify-email', { verificationCode, email });
            if (response?.data) {
                storeUser({ name: response.data.user.name, token: response.data.token });
            }
        } 
        catch (error) {
            console.error('error verifying code', error);
            return error as object;
        }
    }

    const login = async (user: UserAuth): Promise<AuthResponse> => {
        try {
            const response = await api.post('/auth/login', user);
            if (response?.data) {
                storeUser({ name: response.data.user.name, token: response.data.token });
            }
        } 
        catch (error) {
            console.error('error in user login', error);
            return error as object;
        }
    }

    const forgotPassword = async (email: string): Promise<AuthResponse> => {
        try {
            const response = await api.post('/auth/forgot-password', { email });
            if (response?.data) return response.data.msg;
        } 
        catch (error) {
            console.error('error in forgot password', error);
            return error as object;
        }
    }

    const resetPassword = async (userData: ResetPassword): Promise<AuthResponse> => {
        try {
            const response = await api.post('/auth/reset-password', { userData });
            if (response?.data) return response.data.msg;
        } 
        catch (error) {
            console.error('error in password reset', error);
            return error as object;
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

    const verifyUser = async (token: string): Promise<CurrentUser | null | undefined> => {
        try {
            const response = await api.post('/auth/verify-token', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response?.data) return response.data.user as CurrentUser;                      
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