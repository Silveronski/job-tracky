import { useContext, useState } from "react"
import { JobContext } from "../context/JobContext";

const AddJob = () => {
  const [error, setError] = useState({ msg: '', activated: false });
  const { addJob } = useContext(JobContext);

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
    setError({ activated: false });
    e.target.reset();
  }

  return (
    <section className="form-container addjob-container">
        <div className="wrapper">
                <h1>Add a Job</h1>
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

export default AddJob