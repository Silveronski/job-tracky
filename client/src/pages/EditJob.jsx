import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { JobContext } from "../context/JobContext";
import { useToastr } from "../hooks/useToastr";
import { useErrorHandler } from "../hooks/useErrorHandler";
import useAuthRedirect from "../hooks/useAuthRedirect";
import FormFields from "../components/FormFields";
import Button from "../components/Button";
import dashboard from "../assets/images/dashboard.png";
import FormContainer from "../components/FormContainer";

const EditJob = () => {
    const { updateJob } = useContext(JobContext);
    const { error, displayClientError, displayServerError } = useErrorHandler();
    const { generateToastr } = useToastr();
    const navigate = useNavigate();
    const location = useLocation();
    const { currentJob } = location.state || {};

    useAuthRedirect(currentJob);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const company = e.target[0].value.trim();
        const position = e.target[1].value.trim();
        const status = e.target[2].value;
        if (!company || !position) {
            displayClientError();
            return;
        }
        const data = await updateJob(currentJob._id, { company, position, status });
        if (data instanceof Error) {
            displayServerError(data);
            return;
        }
        generateToastr('success', 'Job has been successfully updated');
        navigate("/dashboard");
    }

    return (
        <FormContainer 
            containerClass="editjob-container"
            extraContent={
                <Button 
                    className="primary-button back-to-dashboard"
                    text="Back to Dashboard"
                    onClick={() => navigate('/dashboard')}
                    imgUrl={dashboard}
                    imgClass="dashboard-logo"
                />
            }
        >
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
        </FormContainer>         
    )
}

export default EditJob