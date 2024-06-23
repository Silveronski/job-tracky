import React, { FormEvent, useRef, useState } from "react";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { InputType } from "../../types/inputTypes";
import { useNavigate } from "react-router-dom";
import FormFields from "../../components/form/FormFields";
import Button from "../../components/ui/Button";
import check from "../../assets/images/check.png";
import FormContainer from "../../components/form/FormContainer";
import Loading from "../../components/ui/Loading";
import ModalDialog from "../../components/ui/ModalDialog";
import { useAuth } from "../../hooks/useAuth";

interface ResetPasswordProps {
    resetState: () => void,
    backToLogin: React.MouseEventHandler<HTMLAnchorElement>
};

const ResetPassword: React.FC<ResetPasswordProps> = ({ resetState, backToLogin }) => {
    const { resetPassword } = useAuth();
    const { error, displayClientError, displayServerError } = useErrorHandler();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const dialogRef = useRef<HTMLDialogElement>(null);  

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

    return (
        <FormContainer wrapperClass={isLoading ? "loading" : ""}>
            {isLoading && <Loading/>}                          
            <h1 className="password-reset-title" >Reset Password</h1>
            <p className="password-reset-success">
                Success! Please check your email to reset your password.             
            </p>             
            <form onSubmit={handleResetPassword} className="forgot-password-form"> 
                <FormFields inputType={InputType.regular} label="Verification Code"/>
                <FormFields inputType={InputType.regular} label="New Password" type="password"/>                          
                <div className="form-btn-container">
                    {error.activated && <p className="error">{error.msg}</p>}
                    <Button text="Change Password"/> 
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

export default ResetPassword