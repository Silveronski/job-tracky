import Jobs from "../components/Jobs";
import AddJob from "../components/AddJob";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) !user.token && navigate("/login");                
    }, [loading, user.token]);

    return (
        <section className="dashboard-container">
            <AddJob/>
            <Jobs/>        
        </section>
    )
}

export default Dashboard