import Jobs from "../components/Jobs";
import AddJob from "../components/AddJob";

const Dashboard = () => {
    return (
        <section className="dashboard-container">
            <AddJob/>
            <Jobs/>        
        </section>
    )
}

export default Dashboard