import React, { ChangeEvent, useRef } from "react";
import addAvatar from "../assets/images/addAvatar.png";
import { JobStatus } from "../types/jobTypes";

interface FormFieldsProps {
  label: string,
  inputType? : string,
  labelId? : string, 
  isSelect? : boolean,
  defaultValue? : string,
  selectOptions? : Array<keyof typeof JobStatus>,
  isTypeFile?: boolean,
  handleFileChange?: (file: File | null) => void
};

const FormFields: React.FC<FormFieldsProps> = ({ label, inputType, labelId, isSelect, isTypeFile, defaultValue, selectOptions = [], handleFileChange }) => {
  const vMarkRef = useRef<HTMLElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  
  const handleAvatarUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0] && vMarkRef.current) {
      if (!isFileValid(e.target.files)) {
        alert("File must be an image with a maximum size of 1MB!");
        handleFileChange && handleFileChange(null);
        return;
      }
      handleFileChange && handleFileChange(e.target.files[0]);
      vMarkRef.current.style.display = 'block';  
    }
  }  

  const handleResetFileInput = (): void => {
    if (avatarInputRef.current?.files && vMarkRef.current) {
      avatarInputRef.current.value = '';
      vMarkRef.current.style.display = 'none';
      handleFileChange && handleFileChange(null);
    }
  }

  const isFileValid = (file: FileList): boolean => {
    if (file[0].size > (1024 * 1024) || !file[0].type.startsWith("image")) return false;
    return true;
  }

  return (
    <section className="form-fields">
      {!isTypeFile && <label id={labelId}>{label}</label>}

      {isSelect && 
      <select defaultValue={defaultValue || 'default'}>
          {selectOptions.map((option,index) => (
              <option key={index} value={option}>{option}</option>
          ))}
      </select>} 
      {(!isSelect && !isTypeFile) && <input type={inputType || 'text'} defaultValue={defaultValue}/>}   
       
      {isTypeFile && <>
        <input 
          style={{ display:"none" }} 
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={handleAvatarUpload}
          ref={avatarInputRef}
        />
        <label htmlFor="avatar" className="add-avatar-container">
            <span className='avatar-span'>{label}</span>
            <img src={addAvatar} alt='add avatar icon'/>     
        </label>        
          <i className="v-mark" ref={vMarkRef}>✔</i>
          <i className="trash-can" onClick={handleResetFileInput}>
            <svg viewBox="0 0 24 22" fill="currentColor" height="1em" width="1em">
              <path d="M3 6h18v2H3V6zm1 2h16v13H4V8zm4 2h2v9H8v-9zm4 0h2v9h-2v-9zm4 0h2v9h-2v-9zm1-6V3h-6v1H6v2h12V4h-3z" />
            </svg>  
          </i>           
      </>}                       
    </section>
  )
};

export default FormFields