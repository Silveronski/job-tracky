import { useAuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom";
import React, { useRef} from "react"
import logo from "../assets/images/jobtrackyLogo.png";
import logout from "../assets/images/logout.png";
import updateProfile from "../assets/images/user.png";
import downArrow from "../assets/images/down-arrow.png";
import graph from "../assets/images/graph.png";
import NavItem from "./NavItem";

const Navbar: React.FC = () => {
    const { user, loading, signOut } = useAuthContext(); 
    const dropdownMenuRef = useRef<HTMLElement | null>(null);
    const navigate = useNavigate(); 

    const toggleDropdwonApearence = (): void => {
        if (dropdownMenuRef.current?.style.display === 'block') {
            dropdownMenuRef.current.style.display = 'none';
            return;
        }
        else dropdownMenuRef.current!.style.display = 'block';             
    }

    const signUserOut = (): void => {
        signOut();
        toggleDropdwonApearence();
    }

    const navigateToAccount = (): void => {
        navigate("/account");
        dropdownMenuRef.current!.style.display = 'none'; 
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
                        {user?.avatar && 
                        <img 
                            src={user.avatar} 
                            className="user-avatar" 
                            alt="user avatar" 
                            onClick={toggleDropdwonApearence}
                        />}                   
                        <img 
                            src={downArrow}
                            alt="down arrow"
                            className="down-arrow arrow"
                            onClick={toggleDropdwonApearence}
                        />                  
                        <section className="dropdown-menu-wrapper" ref={dropdownMenuRef}>                         
                            <ul className="dropdwon-menu">
                                <h3 className="username">{user?.name}</h3>
                                <NavItem text="Account" imgUrl={updateProfile} onClick={navigateToAccount}/>
                                <NavItem text="Job Stats" imgUrl={graph}/>
                                <NavItem text="Sign Out" imgUrl={logout} onClick={signUserOut}/>                                                           
                            </ul>
                        </section>                                                                                            
                    </div>                                     
                )}
            </nav>
        </header>
    )
}

export default Navbar