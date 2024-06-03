import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import FormFields from "../components/FormFields";
import Button from "../components/Button";

const EmailVerification = () => {
    const { user, loading, verifyVerificationCode } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { verifyData } = location.state || {};
    const [error, setError] = useState({ msg: '', activated: false });

    // useEffect(() => {
    //     if (!loading) {
    //         if (!verifyData) user?.token ? navigate("/dashboard") : navigate("/login");
    //     }
    // },[navigate, verifyData, loading]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = e.target[0].value.trim();
        if (!verificationCode) {
            setError({ msg: 'Please provide a code', activated: true });
            return;
        }
        const data = await verifyVerificationCode(verificationCode, verifyData.email);
        if (data instanceof Error) {
            setError({ msg: data.response.data.msg, activated: true });
            return;
        }
        navigate("/dashboard");
    }

    return (    
        <section className="form-container">
            <div className="wrapper">
                <h1 className="verify-email-title">Verify email</h1>
                <p className="verify-email-success">Success! Please check your email to verify your account.</p>
                <form onSubmit={handleSubmit} className="verify-form">  
                    <FormFields label="Verification Code"/>
                    <div className="btn-container">
                        {error.activated && <p className="error">{error.msg}</p>}
                        <Button text="Verify"/>                 
                    </div>                  
                </form>
            </div>
        </section>                                  
    )
}

export default EmailVerification