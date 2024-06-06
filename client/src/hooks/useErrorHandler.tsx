import { useState } from "react";

interface ErrorHandler {
    msg: string,
    activated: boolean
}

export const useErrorHandler = (initialState: ErrorHandler = { msg: '', activated: false }) => {
    const [error, setError] = useState<ErrorHandler>(initialState);

    const displayClientError = (msg = 'Please fill out the form') => setError({ msg, activated: true });
        
    const displayServerError = (data: any, setIsLoading: React.Dispatch<React.SetStateAction<boolean>> | null = null) => {
        setIsLoading && setIsLoading(false);
        setError({ msg: data.response.data.msg, activated: true });
    }

    const resetError = () => setError(initialState);

    return { error, displayClientError, displayServerError, resetError };
}