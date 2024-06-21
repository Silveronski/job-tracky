export default function asyncWrapper <T>(fn: (...args: any[]) => Promise<T>): ((...args: any[]) => Promise<T>) {
    return async (...args: any[]): Promise<T> => {
        try {
            return await fn(...args);
        } 
        catch (error) {
            console.error('error:', error);
            throw error;
        }
    };
};