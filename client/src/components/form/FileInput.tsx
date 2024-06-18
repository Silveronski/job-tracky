import React, { ChangeEvent, useRef } from "react";
import { isFileValidImage } from "../../utils/validations";
import { FileInputProps } from "../../types/inputTypes";

const FileInput: React.FC<FileInputProps> = ({ label, handleFileChange, inputName, InputImg, accepts, labelClassName }) => {
    const vMarkRef = useRef<HTMLElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
      if (e.target.files && vMarkRef.current) {
        if (!isFileValidImage(e.target.files)) {
          alert("File must be an image with a maximum size of 1MB!");
          handleFileChange(null);
          return;
        }
        handleFileChange(e.target.files[0]);
        vMarkRef.current.style.display = 'block';  
      }
    }  
  
    const handleResetFileInput = (): void => {
      if (fileInputRef.current && vMarkRef.current) {
        fileInputRef.current.value = '';
        vMarkRef.current.style.display = 'none';
        handleFileChange(null);
      }
    } 

    return (
        <section className="form-fields">
            <input 
                style={{ display:"none" }} 
                type="file"
                id={inputName}
                name={inputName}
                accept={accepts || "image/*"}
                onChange={handleFileUpload}
                ref={fileInputRef}
            />
            <label htmlFor={inputName} className={labelClassName || "add-avatar-container"}>
                <span className='avatar-span'>{label}</span>
                <img src={InputImg} alt='add avatar icon'/>     
            </label>        
            <i className="v-mark" ref={vMarkRef}>✔</i>
            <i className="trash-can" onClick={handleResetFileInput}>
                <svg viewBox="0 0 24 22" fill="currentColor" height="1em" width="1em">
                    <path d="M3 6h18v2H3V6zm1 2h16v13H4V8zm4 2h2v9H8v-9zm4 0h2v9h-2v-9zm4 0h2v9h-2v-9zm1-6V3h-6v1H6v2h12V4h-3z"/>
                </svg>  
            </i> 
        </section>   
    )
}

export default FileInput