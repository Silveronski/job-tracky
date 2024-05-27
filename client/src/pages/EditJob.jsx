import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { JobContext } from "../context/JobContext";
import { AuthContext } from "../context/AuthContext";
import { useToastr } from "../hooks/useToastr";
import FormFields from "../components/FormFields";
import Button from "../components/Button";

const EditJob = () => {
    const { user, loading } = useContext(AuthContext);
    const { updateJob } = useContext(JobContext);
    const location = useLocation();
    const { currentJob } = location.state || {};
    const navigate = useNavigate();
    const [error, setError] = useState({msg: '', activated: false});
    const { generateToastr } = useToastr();

    useEffect(() => {
        if (!loading) {
            if (!currentJob) user.token ? navigate("/dashboard") : navigate("/login");         
        }
    }, [currentJob, navigate, loading]);

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
        generateToastr('success', 'Job has been successfully updated');
        navigate("/dashboard");
    }

    return (
        <section className="form-container editjob-container">       
            <div className="wrapper">
                <h1>Edit Job</h1>
                <form onSubmit={handleFormSubmit}>
                    <FormFields label="Company" defaultValue={currentJob?.company}/>
                    <FormFields label="Position" defaultValue={currentJob?.position}/>
                    <FormFields label="Status" defaultValue={currentJob?.status} isSelect={true}
                    selectOptions={["pending", "interview", "declined"]}/> 
                    <div className="btn-container">
                        {error.activated && <p className="error">{error.msg}</p>}
                        <Button text="Submit"/>
                    </div>                  
                </form>
            </div>
            <Button text="Dashboard" onClick={() => navigate('/dashboard')}/>
    </section>
    )
}

export default EditJob