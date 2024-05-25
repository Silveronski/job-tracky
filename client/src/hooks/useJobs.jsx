import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { api } from "./useAuth";

export const useJobs = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = useContext(AuthContext);

    const getJobs = async () => {
        try {
            const response = await api.get('/jobs', {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            });
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
            const response = await api.post('/jobs', job, {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            });
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

    const updateJob = async (jobId) => {
        try {
            
        } 
        catch (error) {
            console.error('error in adding a job', error);
            return error;
        }
    }

    const deleteJob = async (jobId) => {
        try {
            
        } 
        catch (error) {
            console.error('error in adding a job', error);
            return error;
        }
    }

    useEffect(() => {
        user.token && getJobs();
    }, [user]);

    return { jobs, getJobs, addJob, updateJob, deleteJob }
}