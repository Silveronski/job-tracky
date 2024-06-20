import React from 'react';
import { SelectInputProps } from '../../types/inputTypes';

const SelectInput: React.FC<SelectInputProps> = ({ label, defaultValue, selectOptions, labelId }) => {
    return (
        <section className="form-fields">
            <label id={labelId}>{label}</label>
            <select className='select-input' defaultValue={defaultValue}>
                {selectOptions.map((option,index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </section>   
    )
}

export default SelectInput