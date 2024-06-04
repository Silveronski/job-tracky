import { useContext, useState } from "react"
import { JobContext } from "../context/JobContext";
import { useToastr } from "../hooks/useToastr";
import FormFields from "./FormFields";
import Button from "./Button";
import FormContainer from "./FormContainer";

const AddJob = () => {
  const [error, setError] = useState({ msg: '', activated: false });
  const { addJob } = useContext(JobContext);
  const { generateToastr } = useToastr();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const company = e.target[0].value.trim();
    const position = e.target[1].value.trim();
    if (!company || !position) {
      setError({ msg: 'Please fill out the form', activated: true });
      return;
    }
    const data = await addJob({ company, position });
    if (data instanceof Error) {
      setError({ msg: data.response.data.msg, activated: true });
      return;
    }
    generateToastr('success', 'Job has been successfully created');
    setError({ activated: false });
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