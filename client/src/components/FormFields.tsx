import React from "react";
import { JobStatus } from "../types/jobTypes";

interface FormFieldsProps {
  label: string,
  inputType? : string,
  labelId? : string, 
  isSelect? : boolean,
  defaultValue? : string,
  selectOptions? : Array<keyof typeof JobStatus>
};

const FormFields: React.FC<FormFieldsProps> = ({ label, inputType, labelId, isSelect, defaultValue, selectOptions = [] }) => {
  return (
    <div className="form-fields">
        <label id={labelId}>{label}</label>
        {isSelect ? 
        <select defaultValue={defaultValue || 'default'}>
            {selectOptions.map((option,index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
        : <input type={inputType || 'text'} defaultValue={defaultValue}/>}        
    </div>
  )
};

export default FormFields