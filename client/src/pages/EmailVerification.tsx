import React, { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { InputType } from "../types/inputTypes";
import { useAuth } from "../hooks/useAuth";
import useAuthRedirect from "../hooks/useAuthRedirect";
import FormFields from "../components/form/FormFields";
import Button from "../components/ui/Button";
import FormContainer from "../components/form/FormContainer";
import Loading from "../components/ui/Loading";

const EmailVerification: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { verifyVerificationCode } = useAuth();
    const { error, displayClientError, displayServerError } = useErrorHandler();
    const navigate = useNavigate();
    const location = useLocation();
    const { verifyData } = location.state || {};

    useAuthRedirect(verifyData);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const verificationCode = (form[0] as HTMLInputElement).value.trim();
        if (!verificationCode) {
            displayClientError('Please provide a code');
            return;
        }    
        try {
            setIsLoading(true);
            await verifyVerificationCode(verificationCode, verifyData.email);
            navigate("/dashboard");
        } 
        catch (error: unknown) {
            displayServerError({ error });
        }  
        finally{
            setIsLoading(false);
        }    
    }

    return (    
        <FormContainer wrapperClass={isLoading ? "loading" : ""}>
            {isLoading && <Loading/>}
            <h1 className="verify-email-title">Verify email</h1>
            <p className="verify-email-success">Success! Please check your email to verify your account.</p>
            <form onSubmit={handleSubmit} className="verify-form">  
                <FormFields inputType={InputType.regular} label="Verification Code"/>
                <div className="form-btn-container">
                    {error.activated && <p className="error">{error.msg}</p>}
                    <Button text="Verify"/>                 
                </div>                  
            </form>
        </FormContainer>                          
    )
}

export default EmailVerification