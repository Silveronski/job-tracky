import { Suspense, lazy, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AddJob from "../components/AddJob";
import Loading from "../components/Loading";

const Jobs = lazy(() => import('../components/Jobs'));

const Dashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) !user.token && navigate("/login");                
    }, [loading, user.token]);

    return (
        <section className="dashboard-container">
            <AddJob/>
            <Suspense fallback={<Loading/>}>
                <Jobs/>
            </Suspense>       
        </section>
    )
}

export default Dashboard