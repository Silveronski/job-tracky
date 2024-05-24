import { useContext, useEffect, useState } from "react";
import Job from "./Job";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const jobsTest = [
  {
      _id: 222,
      date: 'July 21st 2021',
      position: 'eeeront-eeend',
      company: 'Apple',
      status: 'INTERVIEW'
  },
  {
      _id: 2221,
      date: 'July 21st 2021',
      position: 'Front-End',
      company: 'Apple',
      status: 'SD1111'
  },
  {
      _id: 221222,
      date: 'July 21st 1123',
      position: 'End',
      company: 'Apple',
      status: 'INTERVIEW'
  },
  {
      _id: 22121222,
      date: 'July 21st 9021',
      position: 'SDSDS SDSD',
      company: 'Apple',
      status: 'SDSDSD112'
  },
  {
      _id: 111222,
      date: 'July 21st 2221',
      position: 'Front-End',
      company: 'Apple SDSD 23',
      status: 'INTERVIEW'
  },
];

const Jobs = () => {
  const { user, loading, getJobs } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            const getJobsFromServer = async () => {
                const data = await getJobs();
                if (data instanceof Error) navigate("/login"); 
                // change - only navigate to login if error is 'unauthorized' !!!   
                setJobs(data);
            }
            getJobsFromServer();
        }     
    }, [loading, navigate]);
  
  return (
    <div className="jobs-container">              
         {jobsTest.length > 0 && jobsTest.map((job) => (
          <Job key={job._id} jobId={job._id} jobCompany={job.company}
            jobDate={job.date} jobPosition={job.position} jobStatus={job.status}/>
        ))}       
    </div>
  )
}

export default Jobs