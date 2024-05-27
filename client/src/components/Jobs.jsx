import Job from "./Job";
import { useContext } from "react";
import { JobContext } from "../context/JobContext";

const Jobs = () => {
  const { jobs } = useContext(JobContext);

  return (
    <section className="jobs-container">    
      <div className="jobs-wrapper">
        {jobs.length > 0 &&
          jobs.map((job) => (
            <Job key={job._id} jobId={job._id} jobCompany={job.company}
            jobDate={job.createdAt} jobPosition={job.position} jobStatus={job.status}/>
        ))} 
      </div>                   
      {jobs.length === 0 && <h3 className="no-jobs">You currently have no jobs to display</h3>}                
    </section>
  )
}

export default Jobs