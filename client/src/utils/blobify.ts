export const blobifyImage = async (imgUrl: string, fileName: string): Promise<File> => {
    try {
        const response = await fetch(imgUrl);
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image')) {
            throw new Error('URL does not point to a valid image file');
        }       
        const blob = await response.blob();
        return new File([blob], fileName, { type: contentType });
    }    
    catch (error: unknown) {
        throw error;
    }
}   