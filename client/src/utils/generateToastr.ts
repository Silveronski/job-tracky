import toastr from 'toastr';

type ToastrDisplayMethod = 'error' | 'success' | 'info' | 'warning';

interface GenerateToastr {
    (
        text: string,
        displayMethod?: ToastrDisplayMethod,
        duration?: number
    ): void;
};

export const generateToastr: GenerateToastr = (text, displayMethod, duration) => {
    const options = {
        timeOut: duration || 5000,
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

    switch (displayMethod) {
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