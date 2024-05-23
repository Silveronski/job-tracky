import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import {useNavigate} from "react-router-dom"

const Dashboard = () => {
    const { user, loading, getJobs } = useContext(AuthContext);
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            const getJobsFromServer = async () => {
                const data = await getJobs();
                if (data instanceof Error) navigate("/login"); 
                // change - only navigate to login if error is 'unauthorized' !!!   
                setJobs(data);
            }
            getJobsFromServer();
        }     
    }, [loading, navigate]);

    return (
        <section>
            <h1>Dashboard</h1>
            <h2>Hello {user.name}</h2>
            {/* <ul>
                {jobs?.length > 0 && jobs.map((job) => {
                    <li>job</li>  
                })}        
            </ul> */}
        </section>
    )
}

export default Dashboard