import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "../hooks/useErrorHandler";
import ResetPassword from "../components/auth/ResetPassword";
import ForgotPassword from "../components/auth/ForgotPassword";

const PasswordRecovery: React.FC = () => {
    const { resetError } = useErrorHandler();
    const [isValidUser, setIsValidUser] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isValidUser = sessionStorage.getItem('isValidUser');
        isValidUser && setIsValidUser(JSON.parse(isValidUser));
        return () => resetState();
    },[]);

    const resetState = () => {
        resetError();
        sessionStorage.getItem('isValidUser') && sessionStorage.removeItem('isValidUser');
        sessionStorage.getItem('userEmail') && sessionStorage.removeItem('userEmail');
    }

    const backToLogin = () => {
        resetState();
        navigate("/login");
    } 

    return (
        <>
            {isValidUser ? 
                <ResetPassword resetState={resetState} backToLogin={backToLogin}/> :
                <ForgotPassword setIsValidUser={setIsValidUser} backToLogin={backToLogin}/>
            }
        </>                                                        
    )
}

export default PasswordRecovery