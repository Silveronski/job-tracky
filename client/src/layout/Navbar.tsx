import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import React from "react"
import logo from "../assets/images/jobtrackyLogo.png";
import logout from "../assets/images/logout.png";
import Button from "../components/Button";

const Navbar: React.FC = () => {
    const { user, loading, signOut } = useAuthContext(); 
    const navigate = useNavigate(); 
    return (
        <header>
            <nav>
                <img 
                    className={(!loading && !user?.token) ? 'centered-logo logo' : 'logo'} 
                    onClick={() => user?.token ? navigate("/dashboard") : navigate("/login")}
                    src={logo} 
                    alt="logo"
                />
                {(!loading && user?.token) && 
                <div>
                    {user?.avatar && <img src={user.avatar} style={{width: '75px'}} alt="user avatar"/>}                   
                    <p>Hello, {user?.name || 'User'}</p>
                    <Button text="Sign Out" onClick={() => signOut()} imgUrl={logout} imgClass="logout"/>
                </div>}
            </nav>
        </header>
    )
}

export default Navbar