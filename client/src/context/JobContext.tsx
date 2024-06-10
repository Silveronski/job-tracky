import { ReactNode, createContext, useContext } from "react";
import { useJobs } from "../hooks/useJobs";
import { JobType } from "../types/jobTypes";

interface JobContextProviderProps {
    children: ReactNode;
};

interface JobContextType {
    jobs: JobType[],
    getJobs: () => Promise<void>,
    addJob: (job: Partial<JobType>) => Promise<void>,
    updateJob: (jobId: string, job: Partial<JobType>) => Promise<void>,
    deleteJob: (jobId: string) => Promise<void>,
    loading: boolean
};

export const JobContext = createContext<JobContextType | null>(null);

export const JobContextProvider = ({ children }: JobContextProviderProps) => {
    const { jobs, getJobs, addJob, updateJob, deleteJob, loading } = useJobs();
    return (
        <JobContext.Provider value={{ jobs, getJobs, addJob, updateJob, deleteJob, loading}}>                                   
            {children}
        </JobContext.Provider>
    )
};

export const useJobContext = () => {
    const context = useContext(JobContext);
    if (!context) {
        throw new Error('JobContext must be used within a JobContextProvider');
    }
    return context;
}