import { useContext } from "react"
import { JobContext } from "../context/JobContext";
import { useToastr } from "../hooks/useToastr";
import { useErrorHandler } from "../hooks/useErrorHandler";
import FormFields from "./FormFields";
import Button from "./Button";
import FormContainer from "./FormContainer";

const AddJob = () => {
  const { error, displayClientError, displayServerError, resetError } = useErrorHandler();
  const { addJob } = useContext(JobContext);
  const { generateToastr } = useToastr();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const company = e.target[0].value.trim();
    const position = e.target[1].value.trim();
    if (!company || !position) {
      displayClientError();
      return;
    }
    const data = await addJob({ company, position });
    if (data instanceof Error) {
      displayServerError(data);
      return;
    }
    generateToastr('success', 'Job has been successfully created');
    resetError();
    e.target.reset();
  }

  return (
    <FormContainer containerClass="addjob-container">
      <h1>Add a Job</h1>
      <form onSubmit={handleFormSubmit}>
        <FormFields label="Company"/>
        <FormFields label="Position"/>
        <div className="btn-container">
            {error.activated && <p className="error">{error.msg}</p>}
            <Button text="Create"/>
        </div>                  
      </form>
    </FormContainer>
  )
}

export default AddJob