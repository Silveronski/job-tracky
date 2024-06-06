import { AuthContext } from "../context/AuthContext"
import React, { useContext } from "react"
import logo from "../assets/images/jobtrackyLogo.png";
import logout from "../assets/images/logout.png";
import Button from "../components/Button";

const Navbar: React.FC = () => {
    const { user, loading, signOut } = useContext(AuthContext);
    return (
        <header>
            <nav>
                <img className={(!loading && !user?.token) ? 'centered-logo logo' : 'logo'} src={logo} alt="logo"/>
                {user?.token && 
                <div>
                    <p>Hello, {user?.name || 'User'}</p>
                    <Button text="Sign Out" onClick={() => signOut()} imgUrl={logout} imgClass="logout"/>
                </div>}
            </nav>
        </header>
    )
}

export default Navbar