import React, { useEffect } from "react";
import { useState } from "react"
import { useErrorHandler } from "../hooks/useErrorHandler";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const Auth: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const { resetError } = useErrorHandler();

    useEffect(() => {
        const isLogin = sessionStorage.getItem('isLogin');
        isLogin && setIsLogin(JSON.parse(isLogin));      
        return () => {
            sessionStorage.removeItem('isLogin');
            resetError();
        }
    },[]);

    const toggleLoginOrRegister = (): void => {
        sessionStorage.setItem('isLogin', JSON.stringify(!isLogin));
        setIsLogin(!isLogin); 
        resetError();
    }

    return (
        <>
            {isLogin ? 
            <Login toggleLoginOrRegister={toggleLoginOrRegister}/> : 
            <Register toggleLoginOrRegister={toggleLoginOrRegister}/>}                                                         
        </>                                                      
    )
}

export default Auth