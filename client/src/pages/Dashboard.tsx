import React, {  Suspense, lazy } from "react";
import useAuthRedirect from "../hooks/useAuthRedirect";
import AddJob from "../components/jobs/AddJob";
import Loading from "../components/ui/Loading";
import Actions from "../components/jobs/Actions";

const Jobs = lazy(() => import("../components/jobs/Jobs"));

const Dashboard: React.FC = () => {
    useAuthRedirect();
    return (
        <section className="dashboard-container">
            <AddJob/>
            <Actions/>
            <Suspense fallback={<Loading className="loading-center"/>}>
                <Jobs/>
            </Suspense>       
        </section>
    )
}

export default Dashboard