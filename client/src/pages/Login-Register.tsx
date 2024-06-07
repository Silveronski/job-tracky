import React, { FormEvent } from "react";
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useErrorHandler } from "../hooks/useErrorHandler";
import FormFields from "../components/FormFields";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import Loading from "../components/Loading";

const LoginRegister: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { error, displayClientError, displayServerError, resetError } = useErrorHandler();
    const { register, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleLoginOrRegister = () => {
        setIsLogin(!isLogin); 
        resetError();
    }
        
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        const form = e.target as HTMLFormElement;  
        const user = {
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
            setIsLoading(false);
            navigate("/dashboard");
        } 
        catch (error: unknown) {
            displayServerError({ error, setIsLoading });
        }            
    }

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement; 
        const user = {
            name: (form[0] as HTMLInputElement).value.trim(),
            email: (form[1] as HTMLInputElement).value.trim(),
            password: (form[2] as HTMLInputElement).value.trim()
        }
        if (!user.email || !user.password || !user.name) {
            displayClientError();
            return;
        }
        if (user.password.length < 6) {
            displayClientError('Password must be at least 6 characters');
            return;
        }         
        setIsLoading(true);
        try {
            await register(user);
            setIsLoading(false);
            const verifyData = { email: user.email };
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
                {!isLogin && <FormFields label="Name"/>}        
                <FormFields label="Email" inputType="email"/>
                <FormFields label="Password" inputType="password"/>
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