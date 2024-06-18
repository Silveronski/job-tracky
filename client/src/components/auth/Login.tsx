import React, { FormEvent, MouseEventHandler } from "react";
import { useState } from "react"
import { useAuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { InputType } from "../../types/inputTypes";
import FormFields from "../../components/form/FormFields";
import Button from "../../components/ui/Button";
import FormContainer from "../../components/form/FormContainer";
import Loading from "../../components/ui/Loading";

interface LoginProps {
    toggleLoginOrRegister: MouseEventHandler<HTMLAnchorElement>
};

const Login: React.FC<LoginProps> = ({ toggleLoginOrRegister }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { error, displayClientError, displayServerError } = useErrorHandler();
    const { login } = useAuthContext();
    const navigate = useNavigate();
        
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
        try {
            setIsLoading(true);
            await login(user);          
            navigate("/dashboard");
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
            <h1>Login</h1>
            <form onSubmit={handleLogin}>       
                <FormFields inputType={InputType.regular} label="Email" type="email"/>
                <FormFields inputType={InputType.regular} label="Password" type="password"/>
                <div className="btn-container">
                    {error.activated && <p className="error">{error.msg}</p>}
                    <Button text="SIGN IN"/>                   
                    <p className="toggler forgot-password">
                        <Link to={"/forgot-password"}>Forgot your password?</Link>
                    </p> 
                    <p className="toggler">Not a member yet? <a onClick={toggleLoginOrRegister}>Register</a></p>                                                                    
                </div>                  
            </form>
        </FormContainer>                          
    )
}

export default Login