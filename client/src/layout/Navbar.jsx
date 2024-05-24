import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
    const { user } = useContext(AuthContext);

    const signOut = () => {
        
    }

    return (
        <header>
            <nav>
                <h1><span>Job</span><span>Tracky</span></h1>
                <div>
                    <p>Hello, {user?.name}</p>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar