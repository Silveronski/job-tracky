import { useNavigate } from "react-router-dom"

const Job = ({jobId, jobDate, jobPosition, jobCompany, jobStatus}) => {
  const currentJob = { jobId, jobCompany, jobPosition, jobStatus };
  const navigate = useNavigate();
  
  return (
    <div className="job-card">
      <div className="job-date-container">
          <small className="job-date">{jobDate}</small>
      </div>       
      <div className="positon-company">
          <h3>{jobPosition}</h3>
          <p>{jobCompany}</p>
      </div>
      <div className="btns-status">
          <div className="btn-container">
              <button onClick={() => navigate('/edit', { state: {currentJob} })}>Edit</button>
              <button>Delete</button>
          </div>
          <small className="status">{jobStatus}</small>
      </div>
    </div>
  )
}

export default Job