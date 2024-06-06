import React, { FormEvent, useContext } from "react"
import { JobContext } from "../context/JobContext";
import { useToastr } from "../hooks/useToastr";
import { useErrorHandler } from "../hooks/useErrorHandler";
import FormFields from "./FormFields";
import Button from "./Button";
import FormContainer from "./FormContainer";

const AddJob: React.FC = () => {
  const { error, displayClientError, displayServerError, resetError } = useErrorHandler();
  const { addJob } = useContext(JobContext);
  const { generateToastr } = useToastr();

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;   
    const company = (form[0] as HTMLInputElement).value.trim();
    const position = (form[1] as HTMLInputElement).value.trim();
    if (!company || !position) {
      displayClientError();
      return;
    }
    try {
      await addJob({ company, position });
      resetError();
      form.reset();
      generateToastr('success', 'Job has been successfully created');
    } 
    catch (error) {
      displayServerError(error);
    }     
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