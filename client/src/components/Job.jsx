import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { JobContext } from "../context/JobContext";
import { useToastr } from "../hooks/useToastr";

const Job = ({ _id, createdAt, position, company, status }) => {
  const currentJob = { _id, company, position, status };
  const navigate = useNavigate();
  const { deleteJob } = useContext(JobContext);
  const { generateToastr } = useToastr();

  const handleDelete = async () => {
    const data = await deleteJob(jobId);
    if (data instanceof Error) {
      generateToastr('error', 'Could not delete the job');
      return;
    }
    generateToastr('success', 'Job has been successfully deleted');
  }
  
  return (
    <section className="job-card">
      <div className="job-date-container">
          <small className="job-date">{new Date(createdAt).toLocaleDateString()}</small>
      </div>       
      <div className="positon-company">
          <h3>{position}</h3>
          <p>{company}</p>
      </div>
      <div className="btns-status">
          <div className="btn-container">
              <button onClick={() => navigate('/edit', { state: {currentJob} })}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
          </div>
          <small className="status">{status}</small>
      </div>
    </section>
  )
}

export default Job