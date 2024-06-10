import React, { FormEvent, useState } from "react"
import { useJobContext } from "../context/JobContext";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { generateToastr } from "../utils/generateToastr";
import FormFields from "./FormFields";
import Button from "./Button";
import FormContainer from "./FormContainer";
import Loading from "./Loading";

const AddJob: React.FC = () => {
  const { error, displayClientError, displayServerError, resetError } = useErrorHandler();
  const { addJob } = useJobContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;   
    const company = (form[0] as HTMLInputElement).value.trim();
    const position = (form[1] as HTMLInputElement).value.trim();
    if (!company || !position) {
      displayClientError();
      return;
    }
    setIsLoading(true);
    try {
      await addJob({ company, position });
      resetError();
      form.reset();
      generateToastr('Job has been successfully created', 'success');
    } 
    catch (error: unknown) {
      displayServerError({ error });
    }    
    finally{
      setIsLoading(false);
    } 
  }

  return (
    <FormContainer containerClass="addjob-container" wrapperClass={isLoading ? "loading" : ""}>
      {isLoading && <Loading/>}
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