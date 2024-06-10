import React from "react";
import { JobStatus } from "../types/jobTypes";

interface FormFieldsProps {
  label: string,
  inputType? : string,
  labelId? : string, 
  defaultValue? : string,
  isSelect? : boolean,
  selectOptions? : Array<keyof typeof JobStatus>
};

const FormFields: React.FC<FormFieldsProps> = ({ label, inputType = 'text', labelId, defaultValue, isSelect, selectOptions = [] }) => {
  return (
    <div className="form-fields">
        <label id={labelId}>{label}</label>
        {isSelect ? 
        <select defaultValue={defaultValue}>
            {selectOptions.map((option,index) => (
                <option key={index} value={option}>{option}</option>
            ))}
        </select>
        : <input type={inputType} defaultValue={defaultValue}/>}        
    </div>
  )
};

export default FormFields