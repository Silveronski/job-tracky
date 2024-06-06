import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api, setAuthToken } from '../api/api-config';
import { EditJobType, JobType, PartialJobType } from "../types/jobTypes";

export const useJobs = () => {
    const { user } = useContext(AuthContext);
    const [jobs, setJobs] = useState<JobType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getJobs = async (): Promise<JobType[]> => {
        try {
            const response = await api.get('/jobs');                    
            setJobs(response?.data?.jobs);
            return response?.data?.jobs;       
        } 
        catch (error) {
            console.error('error in getting jobs', error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const addJob = async (job: PartialJobType): Promise<void> => {
        try {
            const response = await api.post('/jobs', job);                  
            setJobs((prevJobs) => [...prevJobs, response.data.job]);        
        } 
        catch (error) {
            console.error('error in adding a job', error);
            throw error;
        }
    }

    const updateJob = async (jobId: string, editedJob: EditJobType): Promise<void> => {
        try {
            const response = await api.patch(`/jobs/${jobId}`, editedJob);                           
            setJobs((prevJobs) => prevJobs.map(job => job._id === jobId ? response.data.job : job));       
        } 
        catch (error) {
            console.error('error in updating a job', error);
            throw error;
        }
    }

    const deleteJob = async (jobId: string): Promise<void> => {
        try {
            await api.delete(`/jobs/${jobId}`);               
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