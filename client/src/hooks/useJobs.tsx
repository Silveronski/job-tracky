import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { api, setAuthToken } from '../api/api-config';
import { JobType } from "../types/jobTypes";

interface GetJobsResponse { jobs: JobType[] };
    
interface JobResponse { job: JobType };

export const useJobs = () => {
    const { user } = useAuthContext();
    const [jobs, setJobs] = useState<JobType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getJobs = async (): Promise<void> => {
        try {
            const response = await api.get<GetJobsResponse>('/jobs');                    
            setJobs(response?.data?.jobs);     
        } 
        catch (error) {
            console.error('error in getting jobs', error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const addJob = async (job: Partial<JobType>): Promise<void> => {
        try {
            const response = await api.post<JobResponse>('/jobs', job);                  
            setJobs((prevJobs) => [...prevJobs, response.data.job]);        
        } 
        catch (error) {
            console.error('error in adding a job', error);
            throw error;
        }
    }

    const updateJob = async (jobId: string, editedJob: Partial<JobType>): Promise<void> => {
        try {
            const response = await api.patch<JobResponse>(`/jobs/${jobId}`, editedJob);                           
            setJobs((prevJobs) => prevJobs.map(job => job._id === jobId ? response.data.job : job));       
        } 
        catch (error) {
            console.error('error in updating a job', error);
            throw error;
        }
    }

    const deleteJob = async (jobId: string): Promise<void> => {
        try {
            await api.delete<JobResponse>(`/jobs/${jobId}`);               
            setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));    
        } 
        catch (error) {
            console.error('error in deleting a job', error);
            throw error;
        }
    }

    useEffect(() => {
        if (user?.token) {
            setAuthToken(user.token);
            getJobs();
        }
    }, [user.token]);

    return { jobs, getJobs, addJob, updateJob, deleteJob, loading }
}