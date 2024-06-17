import { useAuthContext } from "../context/AuthContext"
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react"
import logo from "../assets/images/jobtrackyLogo.png";
import logout from "../assets/images/logout.png";
import deleteAccount from "../assets/images/delete-account.png";
import updateProfile from "../assets/images/user.png";
import downArrow from "../assets/images/down-arrow.png";

const Navbar: React.FC = () => {
    const { user, loading, signOut } = useAuthContext(); 
    const navigate = useNavigate(); 
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const signUserOut = (): void => {
        signOut();
        setIsDropdownOpen(false);
    }

    return (
        <header>
            <nav>
                <img 
                    className={(!loading && !user?.token) ? 'centered-logo logo' : 'logo'} 
                    onClick={() => user?.token ? navigate("/dashboard") : navigate("/login")}
                    src={logo} 
                    alt="logo"
                />
                {(!loading && user?.token) && (          
                    <div className="dropdown-container">
                        {user?.avatar && <img src={user.avatar} className="user-avatar" alt="user avatar"/>}                   
                        <img 
                            src={downArrow}
                            alt="down arrow"
                            className="down-arrow arrow"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        />
                        {isDropdownOpen &&
                        <section className="dropdown-menu-wrapper">
                            <img 
                                className="up-arrow arrow"
                                src={downArrow}
                                alt="up=arrow"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            /> 
                            <ul className="dropdwon-menu">
                                <li className="dropdown-menu-item">
                                    <img src={updateProfile} alt="Update Profile"/>
                                    <Link to={"#"}>Update Profile</Link>
                                </li>
                                <li className="dropdown-menu-item">
                                    <img src={deleteAccount} alt="Delete Account"/>
                                    <Link to={"#"}>Delete Account</Link>                                
                                </li>
                                <li className="dropdown-menu-item">
                                    <img src={logout} alt="Sign Out"/>
                                    <Link to={"#"} onClick={signUserOut}>Sign Out</Link>                          
                                </li>
                            </ul>
                        </section>                                                                        
                        }          
                    </div>                                     
                )}
            </nav>
        </header>
    )
}

export default Navbar