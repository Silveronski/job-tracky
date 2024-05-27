import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import logo from "../assets/images/jobtrackyLogo.png";
import Button from "../components/Button";

const Navbar = () => {
    const { user, signOut } = useContext(AuthContext);

    return (
        <header>
            <nav>
                <img src={logo} alt="logo"/>
                {user.token && 
                <div>
                    <p>Hello, {user?.name || 'User'}</p>
                    <Button text="Sign Out" onClick={() => signOut()}/>
                </div>}
            </nav>
        </header>
    )
}

export default Navbar