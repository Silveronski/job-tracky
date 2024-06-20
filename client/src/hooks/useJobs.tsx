import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { api, setAuthToken } from '../api/api-config';
import asyncWrapper from "../utils/asyncWrapper";

interface GetJobsResponse { jobs: JobType[] };
    
interface JobResponse { job: JobType };

export const useJobs = () => {
    const { user } = useAuthContext();
    const [jobs, setJobs] = useState<JobType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getJobs = async (): Promise<void> => {
        try {
            const response = await api.get<GetJobsResponse>('/jobs');                    
            setJobs(response.data?.jobs);     
        } 
        catch (error) {
            console.error('error in getting jobs', error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const addJob = asyncWrapper(async (job: Partial<JobType>): Promise<void> => {       
        const response = await api.post<JobResponse>('/jobs', job);                  
        setJobs((prevJobs) => [...prevJobs, response.data.job]);        
    });

    const updateJob = asyncWrapper(async (jobId: string, editedJob: Partial<JobType>): Promise<void> => {      
        const response = await api.patch<JobResponse>(`/jobs/${jobId}`, editedJob);                           
        setJobs((prevJobs) => prevJobs.map(job => job._id === jobId ? response.data.job : job));       
    });

    const deleteJob = asyncWrapper(async (jobId: string): Promise<void> => {      
        await api.delete<JobResponse>(`/jobs/${jobId}`);               
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));            
    });

    useEffect(() => {
        setAuthToken(user.token);
        if (user?.token) getJobs();      
    }, [user.token]);

    return { jobs, getJobs, addJob, updateJob, deleteJob, loading }
}