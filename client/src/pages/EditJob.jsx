import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";

const EditJob = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentJob } = location.state || {};
    const [error, setError] = useState({msg: '', activated: false});

    useEffect(() => {
        !currentJob && navigate("/login");
    }, [currentJob, navigate]);

    const handleFormSubmit = async (e) => {

    }

    return (
        <section className="form-container editjob-container">
            <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            <div className="wrapper">
                <h1>Edit Job</h1>
                <form onSubmit={handleFormSubmit}>
                  <div className="form-fields">
                      <label>Company</label>
                      <input type="text"/>
                  </div>
                  <div className="form-fields">
                      <label>Position</label>
                      <input type="text"/>
                  </div>
                  <div className="btn-container">
                      {error.activated && <p className="error">{error.msg}</p>}
                      <button>Submit</button>
                  </div>                  
                </form>
            </div>
    </section>
    )
}

export default EditJob