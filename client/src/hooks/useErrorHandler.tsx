import axios, { AxiosError } from "axios";
import { useState } from "react";

interface ErrorHandler {
    msg: string,
    activated: boolean
}

export const useErrorHandler = (initialState: ErrorHandler = { msg: '', activated: false }) => {
    const [error, setError] = useState<ErrorHandler>(initialState);

    const displayClientError = (msg = 'Please fill out the form') => setError({ msg, activated: true });
        
    const displayServerError = (errorMsg: unknown | AxiosError, setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null = null) => {
        let msg: string;
        if (axios.isAxiosError(errorMsg)) msg = errorMsg.response?.data?.msg || 'An unknown error occurred';
        else msg = 'An unknown error occurred';     
        setIsLoading && setIsLoading(false);
        setError({ msg: msg, activated: true });
    } 

    const resetError = () => setError(initialState);

    return { error, displayClientError, displayServerError, resetError };
}