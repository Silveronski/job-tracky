import { ReactNode, createContext, useContext } from "react";
import { useJobs } from "../hooks/useJobs";

interface JobContextProviderProps {
    children: ReactNode;
};

interface JobContextType {
    jobs: JobType[],
    loading: boolean,
};

export const JobContext = createContext<JobContextType | null>(null);

export const JobContextProvider = ({ children }: JobContextProviderProps) => {
    const { jobs, loading } = useJobs();
    return (
        <JobContext.Provider value={{ jobs, loading }}>                                   
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
};