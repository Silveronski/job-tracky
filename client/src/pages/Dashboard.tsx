import React, {  Suspense, lazy } from "react";
import useAuthRedirect from "../hooks/useAuthRedirect";
import AddJob from "../components/AddJob";
import Loading from "../components/Loading";

const Jobs = lazy(() => import("../components/Jobs"));

const Dashboard: React.FC = () => {
    useAuthRedirect();
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