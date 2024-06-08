import { ReactNode, createContext } from "react";
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

const defaultState: JobContextType = {
    jobs: [],
    getJobs: async () => {},
    addJob: async () => {},
    updateJob: async () => {},
    deleteJob: async () => {},
    loading: true
};

export const JobContext = createContext<JobContextType>(defaultState);

export const JobContextProvider = ({ children }: JobContextProviderProps) => {
    const { jobs, getJobs, addJob, updateJob, deleteJob, loading } = useJobs();
    return (
        <JobContext.Provider value={{ jobs, getJobs, addJob, updateJob, deleteJob, loading}}>                                   
            {children}
        </JobContext.Provider>
    )
};