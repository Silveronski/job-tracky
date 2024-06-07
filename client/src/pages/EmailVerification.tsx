import React, { FormEvent, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useErrorHandler } from "../hooks/useErrorHandler";
import useAuthRedirect from "../hooks/useAuthRedirect";
import FormFields from "../components/FormFields";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";

const EmailVerification: React.FC = () => {
    const { verifyVerificationCode } = useContext(AuthContext);
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
            await verifyVerificationCode(verificationCode, verifyData.email);
            navigate("/dashboard");
        } 
        catch (error: unknown) {
            displayServerError({ error });
        }     
    }

    return (    
        <FormContainer>
            <h1 className="verify-email-title">Verify email</h1>
            <p className="verify-email-success">Success! Please check your email to verify your account.</p>
            <form onSubmit={handleSubmit} className="verify-form">  
                <FormFields label="Verification Code"/>
                <div className="btn-container">
                    {error.activated && <p className="error">{error.msg}</p>}
                    <Button text="Verify"/>                 
                </div>                  
            </form>
        </FormContainer>                          
    )
}

export default EmailVerification