import { createContext } from "react";
import { useJobs } from "../hooks/useJobs";

export const JobContext = createContext({
    jobs: [],
    getJobs: async () => {},
    addJob: async () => {},
    updateJob: async () => {},
    deleteJob: async () => {},
});

export const JobContextProvider = ({ children }) => {
    const { jobs, getJobs, addJob, updateJob, deleteJob } = useJobs();
    return (
        <JobContext.Provider value={{ jobs, getJobs, addJob, updateJob, deleteJob,}}>                                   
            {children}
        </JobContext.Provider>
    )
}