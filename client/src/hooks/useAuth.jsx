import axios from 'axios';
import { useEffect, useState } from 'react';

export const api = axios.create({
    baseURL: 'http://localhost:3002/api/v1'
});

export const useAuth = () => {
    const [user, setUser] = useState({ name: '', token: null });
    const [loading, setLoading] = useState(true);
    
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

    const storeUser = (user) => {
        setUser(user);
        localStorage.setItem('userData', JSON.stringify(user));
    }


    useEffect(() => {
        const userData = localStorage.getItem('userData');
        userData && setUser(JSON.parse(userData));
        setLoading(false);
    },[]);

    return { user, loading, register, login };
}