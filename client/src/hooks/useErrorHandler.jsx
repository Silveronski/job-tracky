import { useState } from "react";

export const useErrorHandler = (initialState = { msg: '', activated: false }) => {
    const [error, setError] = useState(initialState);

    const displayClientError = (msg = 'Please fill out the form') => setError({ msg, activated: true });
        
    const displayServerError = (data, setIsLoading = null) => {
        setIsLoading && setIsLoading(false);
        setError({ msg: data.response.data.msg, activated: true });
    }

    const resetError = () => setError(initialState);

    return { error, displayClientError, displayServerError, resetError };
}