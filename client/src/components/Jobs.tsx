import React, { useContext } from "react";
import { JobContext } from "../context/JobContext";
import { exportJobsToExcel } from "../utils/exportJobsToExcel";
import excel from "../assets/images/excel.png";
import Job from "./Job";
import Button from "./Button";

const Jobs: React.FC = () => {
  const { jobs, loading } = useContext(JobContext);

  return (
    <section className="jobs-container">
      <div className="excel-btn-container">
        <Button 
          text="Export to excel"
          onClick={() => exportJobsToExcel(jobs)}
          className="secondary-button"
          imgUrl={excel}
          imgClass="excel-img"
        />    
      </div>
      <div className="jobs-wrapper">
        {jobs.length > 0 &&
          jobs.map((job) => (
            <Job key={job._id} {...job}/>
        ))} 
      </div>                   
      {(!loading && jobs.length === 0) && <h3 className="no-jobs">You currently have no jobs to display</h3>}                
    </section>
  )
}

export default Jobs