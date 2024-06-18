export interface RegularInputProps {
    inputType: InputType.regular,
    label: string,
    type? : string,
    labelId? : string, 
    defaultValue?: string
};

export interface SelectInputProps {
    inputType: InputType.select,
    label: string,
    defaultValue: string,
    selectOptions: Array<keyof typeof JobStatus>,
    labelId?: string
};
  
export interface FileInputProps {
    inputType: InputType.file,
    label: string,
    inputName: string,
    InputImg: string,
    handleFileChange: (file: File | null) => void,
    accepts?: string,
    labelClassName?: string
};

export const enum InputType {
    regular = 'regular',
    select = 'select',
    file = 'file'
};