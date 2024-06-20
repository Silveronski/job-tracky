import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { InputType } from "../types/inputTypes";
import FormFields from "../components/form/FormFields";
import Button from "../components/ui/Button";
import check from "../assets/images/check.png";
import FormContainer from "../components/form/FormContainer";
import Loading from "../components/ui/Loading";
import ModalDialog from "../components/ui/ModalDialog";

const ForgotPassword: React.FC = () => {
    const { forgotPassword, resetPassword } = useAuthContext();
    const { error, displayClientError, displayServerError, resetError } = useErrorHandler();
    const [isValidUser, setIsValidUser] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const isValidUser = sessionStorage.getItem('isValidUser');
        isValidUser && setIsValidUser(JSON.parse(isValidUser));
        return () => resetState();
    },[]);

    const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;      
        const email = (form[0] as HTMLInputElement).value.trim();
        if (!email) {
            displayClientError('Please provide a valid email');
            return;
        }
        setIsLoading(true);
        try {
            await forgotPassword(email);
            resetError();
            setIsValidUser(true);    
            sessionStorage.setItem('isValidUser', JSON.stringify(true));
            sessionStorage.setItem('userEmail', JSON.stringify(email));
        } 
        catch (error) {
            displayServerError({ error, setIsLoading });
        }      
        finally{
            setIsLoading(false);
        }
    }

    const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = sessionStorage.getItem('userEmail');
        if (!email) return; // handle later
        const user: ResetPassword = {
            verificationCode: (form[0] as HTMLInputElement).value.trim(),
            password: (form[1] as HTMLInputElement).value.trim(),
            email: JSON.parse(email)
        };     
        if (!user.verificationCode || !user.password) {
            displayClientError();
            return;
        }
        if (user.password.length < 6) {
            displayClientError('Password must be at least 6 characters');
            return;
        }   
        try {
            setIsLoading(true);
            await resetPassword(user);
            setIsLoading(false);
            form.reset();
            resetState();
            dialogRef.current?.showModal();
        } 
        catch (error: unknown) {
            displayServerError({ error, setIsLoading });
        }
    }

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
        <FormContainer wrapperClass={[isLoading ? "loading" : "", isValidUser ? "" : "no-inline-padding"].join(' ')}>
            {isLoading && <Loading/>}                          
            <h1 className={isValidUser ? "password-reset-title" : "forgot-password-title"}>Reset Password</h1>
            <p className={isValidUser ? "password-reset-success" : "password-reset-prompt"}>
                {isValidUser ? "Success! Please check your email to reset your password."  
                : "Enter your email address and we will send you a code to reset your password."}
            </p>             
            <form onSubmit={!isValidUser ? handleForgotPassword : handleResetPassword} className="forgot-password-form"> 
                {!isValidUser ?         
                    <FormFields inputType={InputType.regular} label="Email" type="email" labelId="forgot-password-email"/>                                                 
                :<>
                    <FormFields inputType={InputType.regular} label="Verification Code"/>
                    <FormFields inputType={InputType.regular} label="New Password" type="password"/>
                </>}                   
                <div className="btn-container">
                    {error.activated && <p className="error">{error.msg}</p>}
                    <Button text={isValidUser ? "Change Password" : "Send me a reset code"}/> 
                    <p className="toggler back-to-login"><a onClick={backToLogin}>Back to login</a></p>                  
                </div>               
            </form>  
            <ModalDialog 
                dialogRef={dialogRef}
                imgUrl={check}
                header="Password Changed!"
                subHeader="Your password has been changed successfully"
                btnOnClick={() => navigate("/login")}
                btnText="Back to Login"
            />  
        </FormContainer>                                                                        
    )
}

export default ForgotPassword