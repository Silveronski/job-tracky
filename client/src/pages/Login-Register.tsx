import React, { FormEvent, useEffect } from "react";
import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { InputType } from "../types/inputTypes";
import FormFields from "../components/form/FormFields";
import Button from "../components/ui/Button";
import FormContainer from "../components/form/FormContainer";
import Loading from "../components/ui/Loading";
import addAvatar from "../assets/images/addAvatar.png";

const LoginRegister: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const { error, displayClientError, displayServerError, resetError } = useErrorHandler();
    const { register, login } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        const isLogin = sessionStorage.getItem('isLogin');
        isLogin && setIsLogin(JSON.parse(isLogin));      
        return () => {
            sessionStorage.removeItem('isLogin');
            setIsLoading(false);
        }
    },[]);

    const toggleLoginOrRegister = (): void => {
        sessionStorage.setItem('isLogin', JSON.stringify(!isLogin));
        setIsLogin(!isLogin); 
        resetError();
    }
        
    const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault(); 
        const form = e.target as HTMLFormElement;  
        const user: UserAuth = {
            email: (form[0] as HTMLInputElement).value.trim(),
            password: (form[1] as HTMLInputElement).value.trim()
        } 
        if (!user.email || !user.password) {
            displayClientError();
            return;
        }
        setIsLoading(true);
        try {
            await login(user);          
            navigate("/dashboard");
        } 
        catch (error: unknown) {
            displayServerError({ error, setIsLoading });
        }            
    }

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
        avatarFile && formData.append("avatar", avatarFile);    
        setIsLoading(true);
        try {
            await register(formData);
            const verifyData = { email };
            navigate("/verify-email", { state: {verifyData} }); 
        } 
        catch (error: unknown) {
            displayServerError({ error, setIsLoading });
        }             
    }

    return (
        <FormContainer wrapperClass={isLoading ? "loading" : ""}>
            {isLoading && <Loading/>}
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
                {!isLogin && <FormFields inputType={InputType.regular} label="Name *"/>}        
                <FormFields inputType={InputType.regular} label={isLogin ? "Email" : "Email *"} type="email"/>
                <FormFields inputType={InputType.regular} label={isLogin ? "Password " : "Password *"} type="password"/>
                {!isLogin && 
                    <FormFields 
                        inputType={InputType.file}
                        label="Avatar"
                        InputImg={addAvatar} 
                        inputName="avatar" 
                        handleFileChange={setAvatarFile}
                    />
                } 
                <div className="btn-container">
                    {error.activated && <p className="error">{error.msg}</p>}
                    <Button text={isLogin ? "SIGN IN" : "SIGN UP"}/> 
                    {isLogin && <p className="toggler forgot-password"><Link to={"/forgot-password"}>Forgot your password?</Link></p>}                   
                    <p className="toggler">{isLogin ? 'Not a member yet?' : 'Already a member?'}
                        <a onClick={toggleLoginOrRegister}> {isLogin ? 'Register' : 'Login'}</a>
                    </p>
                </div>                  
            </form>
        </FormContainer>                          
    )
}

export default LoginRegister