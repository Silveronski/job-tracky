import React, { FormEvent, useState } from "react"
import { useJobs } from "../../hooks/useJobs";
import { useErrorHandler } from "../../hooks/useErrorHandler";
import { generateToastr } from "../../utils/generateToastr";
import { InputType } from "../../types/inputTypes";
import FormFields from "../form/FormFields";
import Button from "../ui/Button";
import FormContainer from "../form/FormContainer";
import Loading from "../ui/Loading";

const AddJob: React.FC = () => {
  const { error, displayClientError, displayServerError, resetError } = useErrorHandler();
  const { addJob } = useJobs();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;   
    const job: Partial<JobType> = {
      position : (form[0] as HTMLInputElement).value.trim(),
      company : (form[1] as HTMLInputElement).value.trim(),
      jobType : (form[2] as HTMLInputElement).value as JobType['jobType']
    };  
    if (!job.company || !job.position) {
      displayClientError();
      return;
    }    
    try {
      setIsLoading(true);
      await addJob(job);
      resetError();
      form.reset();
      generateToastr('Job has been successfully created', 'success');
    } 
    catch (error: unknown) {
      displayServerError({ error });
    }    
    finally {
      setIsLoading(false);
    } 
  }

  return (
    <FormContainer containerClass="addjob-container" wrapperClass={isLoading ? "loading" : ""}>
      {isLoading && <Loading/>}
      <h1>Add a Job</h1>
      <form onSubmit={handleFormSubmit}>
        <FormFields inputType={InputType.regular} label="Position"/>
        <FormFields inputType={InputType.regular} label="Company"/>
        <FormFields 
          inputType={InputType.select} 
          label="Job Type" 
          selectOptions={['full-time', 'part-time', 'remote', 'internship']}
        />
        <div className="form-btn-container">
            {error.activated && <p className="error">{error.msg}</p>}
            <Button text="Create"/>
        </div>                  
      </form>
    </FormContainer>
  )
}

export default AddJob