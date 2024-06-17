interface RegularInputProps {
    inputType: 'regular',
    label: string,
    type? : string,
    labelId? : string, 
    defaultValue?: string
};

interface SelectInputProps {
    inputType: 'select',
    label: string,
    defaultValue: string,
    selectOptions: Array<keyof typeof JobStatus>,
    labelId?: string
};
  
  interface FileInputProps {
    inputType: 'file',
    label: string,
    inputName: string,
    InputImg: string,
    handleFileChange: (file: File | null) => void,
    accepts?: string,
    labelClassName?: string
};