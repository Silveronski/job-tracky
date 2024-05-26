import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { JobContext } from "../context/JobContext";

const EditJob = () => {
    const { updateJob } = useContext(JobContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { currentJob } = location.state || {};
    const [error, setError] = useState({msg: '', activated: false});

    useEffect(() => {
        !currentJob && navigate("/login");
    }, [currentJob, navigate]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const company = e.target[0].value.trim();
        const position = e.target[1].value.trim();
        const status = e.target[2].value;
        if (!company || !position) {
            setError({ msg: 'Please fill out the form', activated: true });
            return;
        }
        const data = await updateJob(currentJob._id, { company, position, status });
        if (data instanceof Error) {
            setError({ msg: data.response.data.msg, activated: true });
            return;
        }
        navigate("/dashboard");
    }

    return (
        <section className="form-container editjob-container">       
            <div className="wrapper">
                <h1>Edit Job</h1>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-fields">
                      <label>Company</label>
                      <input type="text" defaultValue={currentJob.company}/>
                  </div>
                  <div className="form-fields">
                      <label>Position</label>
                      <input type="text" defaultValue={currentJob.position}/>
                  </div>
                  <div className="form-fields">
                      <label>Status</label>
                      <select defaultValue={currentJob.status}>
                        <option value="pending">pending</option>
                        <option value="interview">interview</option>
                        <option value="declined">declined</option>
                      </select>
                  </div>
                  <div className="btn-container">
                      {error.activated && <p className="error">{error.msg}</p>}
                      <button>Submit</button>
                  </div>                  
                </form>
            </div>
            <button className="primary-button" onClick={() => navigate('/dashboard')}>Dashboard</button>
    </section>
    )
}

export default EditJob