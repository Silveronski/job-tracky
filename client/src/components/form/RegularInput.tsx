import React from 'react';
import { RegularInputProps } from '../../types/inputTypes';

const RegularInput: React.FC<RegularInputProps> = ({ label, type, labelId, defaultValue }) => {
    return (     
        <section className="form-fields">
            <label id={labelId}>{label}</label>
            <input type={type || 'text'} defaultValue={defaultValue}/>
        </section>      
    )
}

export default RegularInput