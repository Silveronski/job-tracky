import React, { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useJobContext } from "../context/JobContext";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { generateToastr } from "../utils/generateToastr";
import { InputType } from "../types/inputTypes";
import useAuthRedirect from "../hooks/useAuthRedirect";
import FormFields from "../components/form/FormFields";
import Button from "../components/ui/Button";
import dashboard from "../assets/images/dashboard.png";
import FormContainer from "../components/form/FormContainer";
import Loading from "../components/ui/Loading";

const EditJob: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { updateJob } = useJobContext();
    const { error, displayClientError, displayServerError } = useErrorHandler();
    const navigate = useNavigate();
    const location = useLocation();
    const { currentJob } = location.state || {};

    useAuthRedirect(currentJob);

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const company = (form[0] as HTMLInputElement).value.trim();
        const position = (form[1] as HTMLInputElement).value.trim();
        const status = (form[2] as HTMLInputElement).value as JobStatus;
        if (!company || !position) {
            displayClientError();
            return;
        }
        setIsLoading(true);
        try {
            await updateJob(currentJob._id, { company, position, status });
            generateToastr('Job has been successfully updated', 'success');
            navigate("/dashboard");
        } 
        catch (error: unknown) {
            displayServerError({ error });
        }    
        finally{
            setIsLoading(false);
        }          
    }

    return (
        <FormContainer 
            containerClass="editjob-container"
            wrapperClass={isLoading ? "loading" : ""}
            extraContent={
                <Button 
                    className="secondary-button"
                    text="Back to Dashboard"
                    onClick={() => navigate('/dashboard')}
                    imgUrl={dashboard}
                    imgClass="dashboard-logo"
                />
            }
        >
            {isLoading && <Loading/>}
            <h1>Edit Job</h1>
            <form onSubmit={handleFormSubmit}>
                <FormFields 
                    inputType={InputType.regular}
                    label="Company"
                    defaultValue={currentJob?.company}
                />
                <FormFields 
                    inputType={InputType.regular} 
                    label="Position"
                    defaultValue={currentJob?.position}
                />
                <FormFields 
                    inputType={InputType.select}
                    label="Status"
                    defaultValue={currentJob?.status} 
                    selectOptions={["pending", "interview", "declined"]}
                /> 
                <div className="btn-container">
                    {error.activated && <p className="error">{error.msg}</p>}
                    <Button text="Edit"/>
                </div>                  
            </form>
        </FormContainer>         
    )
}

export default EditJob