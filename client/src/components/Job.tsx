import React from "react";
import { useNavigate } from "react-router-dom"
import { useJobContext } from "../context/JobContext";
import { JobType } from "../types/jobTypes";
import { generateToastr } from "../utils/generateToastr";

const Job: React.FC<JobType> = ({ _id, createdAt, position, company, status }) => {
  const currentJob = { _id, company, position, status };
  const navigate = useNavigate();
  const { deleteJob } = useJobContext();

  const handleDelete = async () => {
    try {
      await deleteJob(_id);
      generateToastr('Job has been successfully deleted', 'success');
    } 
    catch (error) {
      generateToastr('Could not delete the job', 'error');
    }  
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