import { ReactNode, createContext } from "react";
import { useJobs } from "../hooks/useJobs";
import { EditJobType, JobApiResponse, JobType, PartialJobType } from "../types/jobTypes";

interface JobContextProviderProps {
    children: ReactNode;
};

interface JobContextType {
    jobs: JobType[],
    getJobs: () => Promise<JobApiResponse>,
    addJob: (job: PartialJobType) => Promise<JobApiResponse>,
    updateJob: (jobId: string, job: EditJobType) => Promise<JobApiResponse>,
    deleteJob: (jobId: string) => Promise<JobApiResponse>,
    loading: boolean
};

const defaultState: JobContextType = {
    jobs: [],
    getJobs: () => Promise.resolve(undefined),
    addJob: () => Promise.resolve(undefined),
    updateJob: () => Promise.resolve(undefined),
    deleteJob: () => Promise.resolve(undefined),
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