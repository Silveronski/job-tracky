import { useEffect, useState } from 'react';
import { api } from '../api/api-config';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [user, setUser] = useState({ name: '', token: null });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    const register = async (user) => {
        try {
            const response = await api.post('/auth/register', user);
            if (response?.data) {
                storeUser({ name: response.data.user.name, token: response.data.token });
            }
        } 
        catch (error) {
            console.error('error registering user', error);
            return error;
        }
    }

    const login = async (user) => {
        try {
            const response = await api.post('/auth/login', user);
            if (response?.data) {
                storeUser({ name: response.data.user.name, token: response.data.token });
            }
        } 
        catch (error) {
            console.error('error in user login', error);
            return error;
        }
    }

    const signOut = () => {
        localStorage.removeItem('userData');
        setUser({ name: '', token: null });
        navigate("/login");
    }

    const verifyUser = async (token) => {
        try {
            const response = await api.post('/auth/verify-token', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data) return response.data.user;                      
        } 
        catch (error) {
            console.error('error validating token', error);
            return null;
        }
    }

    const storeUser = (user) => {
        setUser(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    useEffect(() => {
        const checkToken = async () => {
            const userData = localStorage.getItem('userData');
            if (userData) {
                const parsedUserData = JSON.parse(userData);
                const validUser = await verifyUser(parsedUserData.token);
                if (validUser) {
                    setUser({ name: validUser.name, token: validUser.token });
                }
                else {
                    localStorage.removeItem('userData');
                    setUser({ name: '', token: null });
                }
            }      
            setLoading(false);
        }
        checkToken();
    },[]);

    return { user, loading, register, login, signOut };
}