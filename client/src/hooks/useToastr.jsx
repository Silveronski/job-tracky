import toastr from 'toastr';

export const useToastr = () => {
    const generateToastr = (toastType = 'info', text = 'Message', duration = 5000) => {
        const options = {
            timeOut: duration,
            extendedTimeOut: 0, 
            closeButton: true, 
            positionClass: "toast-bottom-left", 
            tapToDismiss: true,
            preventDuplicates: true, 
            hideDuration: 300,
            showMethod: 'slideDown',
            hideMethod: 'slideUp',
            showEasing: 'linear',
            hideEasing: 'linear'
        };

        switch (toastType) {
            case 'error':
                toastr.error(text, '', options);
                break;
            case 'success':
                toastr.success(text, '', options);
                break;
            case 'info':
                toastr.info(text, '', options);
                break;
            case 'warning':
                toastr.warning(text, '', options);
                break;
            default:
                toastr.info(text, '', options);
        }
    }

    return { generateToastr };
}