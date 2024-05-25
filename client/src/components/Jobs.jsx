import Job from "./Job";
import { useContext } from "react";
import { JobContext } from "../context/JobContext";

const Jobs = () => {
  const { jobs } = useContext(JobContext);

  return (
    <div className="jobs-container">              
         {jobs.length > 0 ? 
         jobs.map((job) => (
          <Job key={job._id} jobId={job._id} jobCompany={job.company}
            jobDate={job.createdAt} jobPosition={job.position} jobStatus={job.status}/>
        )) : 
        <h3 className="no-jobs">You currently have no jobs to display</h3>}                 
    </div>
  )
}

export default Jobs