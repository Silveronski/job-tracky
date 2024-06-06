import { createContext } from "react";
import { useJobs } from "../hooks/useJobs";

export const JobContext = createContext({
    jobs: [],
    getJobs: async () => {},
    addJob: async () => {},
    updateJob: async () => {},
    deleteJob: async () => {},
    loading: true
});

export const JobContextProvider = ({ children }) => {
    const { jobs, getJobs, addJob, updateJob, deleteJob, loading } = useJobs();
    return (
        <JobContext.Provider value={{ jobs, getJobs, addJob, updateJob, deleteJob, loading}}>                                   
            {children}
        </JobContext.Provider>
    )
}