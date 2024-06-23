import React, { FormEvent, useState } from "react";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { InputType } from "../../types/inputTypes";
import FormFields from "../form/FormFields";
import Button from "../ui/Button";
import FormContainer from "../form/FormContainer";
import Loading from "../ui/Loading";
import { useAuthContext } from "../../context/AuthContext";

interface ForgotPasswordProps {
    setIsValidUser: React.Dispatch<React.SetStateAction<boolean>>,
    backToLogin: React.MouseEventHandler<HTMLAnchorElement>
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setIsValidUser, backToLogin }) => {
    const { forgotPassword } = useAuthContext();
    const { error, displayClientError, displayServerError, resetError } = useErrorHandler();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;      
        const email = (form[0] as HTMLInputElement).value.trim();
        if (!email) {
            displayClientError('Please provide a valid email');
            return;
        }      
        try {
            setIsLoading(true);
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

    return (
        <FormContainer wrapperClass={[isLoading ? "loading" : "", "no-inline-padding"].join(' ')}>
            {isLoading && <Loading/>}                          
            <h1 className="forgot-password-title">Reset Password</h1>
            <p className="password-reset-prompt">             
                Enter your email address and we will send you a code to reset your password.
            </p>             
            <form onSubmit={handleForgotPassword} className="forgot-password-form">                   
                <FormFields inputType={InputType.regular} label="Email" type="email" labelId="forgot-password-email"/>                                                                            
                <div className="form-btn-container">
                    {error.activated && <p className="error">{error.msg}</p>}
                    <Button text="Send me a reset code"/> 
                    <p className="toggler back-to-login"><a onClick={backToLogin}>Back to login</a></p>                  
                </div>               
            </form>  
        </FormContainer>                                                                        
    )
}

export default ForgotPassword