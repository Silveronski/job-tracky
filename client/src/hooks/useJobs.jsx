import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api, setAuthToken } from '../api/api-config';

export const useJobs = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = useContext(AuthContext);

    const getJobs = async () => {
        try {
            const response = await api.get('/jobs');             
            if (response?.data) {
                setJobs(response.data.jobs);
                return response.data.jobs;
            }
        } 
        catch (error) {
            console.error('error in getting jobs', error);
            return error;
        }
    }

    const addJob = async (job) => {
        try {
            const response = await api.post('/jobs', job);          
            if (response?.data) {
                setJobs((prevJobs) => [...prevJobs, response.data.job]);
                return response.data.job;
            }
        } 
        catch (error) {
            console.error('error in adding a job', error);
            return error;
        }
    }

    const updateJob = async (jobId, editedJob) => {
        try {
            const response = await api.patch(`/jobs/${jobId}`, editedJob);                    
            if (response?.data) {
                setJobs((prevJobs) => prevJobs.map(job => job._id === jobId ? response.data.job : job));
                return response.data.job;
            }
        } 
        catch (error) {
            console.error('error in adding a job', error);
            return error;
        }
    }

    const deleteJob = async (jobId) => {
        try {
            const response = await api.delete(`/jobs/${jobId}`);         
            if (response?.data){
                setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
                return response.data.job;
            }
        } 
        catch (error) {
            console.error('error in deleting a job', error);
            return error;
        }
    }

    useEffect(() => {
        if (user.token) {
            setAuthToken(user.token);
            getJobs();
        }
    }, [user.token]);

    return { jobs, getJobs, addJob, updateJob, deleteJob }
}