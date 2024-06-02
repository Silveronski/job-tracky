import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FormFields from "../components/FormFields";
import Button from "../components/Button";

const LoginRegister = () => {
    const [error, setError] = useState({ msg: '', activated: false });
    const [isLogin, setIsLogin] = useState(true);
    const { register, login } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleLoginOrRegister = () => setIsLogin(!isLogin);
        
    const handleLogin = async (e) => {
        e.preventDefault();   
        const user = {
            email: e.target[0].value.trim(),
            password: e.target[1].value.trim()
        } 
        if (!user.email || !user.password) {
            setError({ msg: 'Please fill the form', activated: true });
            return;
        }
        const data = await login(user);
        if (data instanceof Error) {
            setError({ msg: data.response.data.msg, activated: true });
            return;
        }
        navigate("/dashboard");
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const user = {
            name: e.target[0].value.trim(),
            email: e.target[1].value.trim(),
            password: e.target[2].value.trim()
        }
        if (!user.email || !user.password || !user.name) {
            setError({ msg: 'Please fill the form', activated: true });
            return;
        }
        const data = await register(user);
        if (data instanceof Error) {
            setError({ msg: data.response.data.msg, activated: true });
            return;           
        }
        const verifyData = { msg: data.msg, email: user.email };
        navigate("/verify-email", { state: {verifyData} });   
    }

    return (
        <section className="form-container">
            <div className="wrapper">
                {<h1>{isLogin ? 'Login' : 'Register'}</h1>}
                <form onSubmit={isLogin ? handleLogin : handleRegister}>
                   {!isLogin && <FormFields label="Name"/>}        
                   <FormFields label="Email" inputType="email"/>
                   <FormFields label="Password" inputType="password"/>
                    <div className="btn-container">
                        {error.activated && <p className="error">{error.msg}</p>}
                        <Button text="Submit"/>
                        <p className="toggler">{isLogin ? 'Not a member yet?' : 'Already a member?'}
                            <a onClick={toggleLoginOrRegister}> {isLogin ? 'Register' : 'Login'}</a>
                        </p>
                    </div>                  
                </form>
            </div>
        </section>
    )
}

export default LoginRegister