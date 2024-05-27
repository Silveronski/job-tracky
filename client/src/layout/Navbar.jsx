import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import logo from "../assets/images/jobtrackyLogo.png";

const Navbar = () => {
    const { user, signOut } = useContext(AuthContext);

    return (
        <header>
            <nav>
                <img src={logo} alt="logo"/>
                {user.token && 
                <div>
                    <p>Hello, {user?.name || 'User'}</p>
                    <button onClick={() => signOut()}>Sign Out</button>
                </div>}
            </nav>
        </header>
    )
}

export default Navbar