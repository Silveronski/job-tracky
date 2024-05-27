import toastr from 'toastr';

export const useToastr = () => {
    const generateToastr = (toastType = 'info', text = 'Message', duration = 7000) => {
        const options = {
            timeOut: duration,
            extendedTimeOut: 0, 
            closeButton: true, 
            positionClass: "toast-bottom-left", 
            tapToDismiss: true,
            preventDuplicates: true,  
        };
    
        if (toastType === 'error') {
            toastr.error(text, '', options);                             
        }
        else if (toastType === 'success') {
            toastr.success(text, '', options);
        }
        else if (toastType === 'info') {
            toastr.info(text, '', options);
        }
        else if (toastType === 'warning') {
            toastr.warning(text, '', options);
        }
        else {
            toastr.info(text, '', options);
        }
    }

    return { generateToastr };
}