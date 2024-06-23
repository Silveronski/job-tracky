import React, { FormEvent, MouseEventHandler } from "react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { InputType } from "../../types/inputTypes";
import { blobifyImage } from "../../utils/blobify";
import FormFields from "../../components/form/FormFields";
import Button from "../../components/ui/Button";
import FormContainer from "../../components/form/FormContainer";
import Loading from "../../components/ui/Loading";
import addAvatar from "../../assets/images/addAvatar.png";
import defaultAvatar from "../../assets/images/jobtracky-favicon.png"; 
import { useAuth } from "../../hooks/useAuth";

interface RegisterProps {
    toggleLoginOrRegister: MouseEventHandler<HTMLAnchorElement>
};

const Register: React.FC<RegisterProps> = ({ toggleLoginOrRegister }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const { error, displayClientError, displayServerError } = useErrorHandler();
    const { register } = useAuth();
    const navigate = useNavigate();
            
    const handleRegister = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const form = e.target as HTMLFormElement; 
        const name = (form[0] as HTMLInputElement).value.trim();
        const email = (form[1] as HTMLInputElement).value.trim();
        const password = (form[2] as HTMLInputElement).value.trim();  
        if (!name || !email || !password) {
            displayClientError();
            return;
        }
        if (password.length < 6) {
            displayClientError('Password must be at least 6 characters');
            return;
        }     
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        if (avatarFile) formData.append("avatar", avatarFile);
        else { // provide default avatar
            try {
                const defaultAvatarImg = await blobifyImage(defaultAvatar, 'defaultAvatar');
                formData.append("avatar", defaultAvatarImg);  
            }
            catch (error: unknown) {
                displayClientError('Failed to process default avatar image');
                return;
            }         
        }        
        try {
            setIsLoading(true);
            await register(formData);
            const verifyData = { email };
            navigate("/verify-email", { state: {verifyData} }); 
        } 
        catch (error: unknown) {
            displayServerError({ error, setIsLoading });
        } 
        finally {
            setIsLoading(false);
        }              
    }

    return (
        <FormContainer wrapperClass={isLoading ? "loading" : ""}>
            {isLoading && <Loading/>}
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <FormFields inputType={InputType.regular} label="Name *"/>       
                <FormFields inputType={InputType.regular} label="Email *" type="email"/>
                <FormFields inputType={InputType.regular} label="Password *" type="password"/>            
                <FormFields 
                    inputType={InputType.file}
                    label="Avatar"
                    InputImg={addAvatar} 
                    inputName="avatar" 
                    handleFileChange={setAvatarFile}
                />            
                <div className="form-btn-container">
                    {error.activated && <p className="error">{error.msg}</p>}
                    <Button text="SIGN UP"/> 
                    <p className="toggler">Already a member? <a onClick={toggleLoginOrRegister}>Login</a></p>                                      
                </div>                  
            </form>
        </FormContainer>                          
    )
}

export default Register