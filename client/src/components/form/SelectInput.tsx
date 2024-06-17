import React from 'react';

const SelectInput: React.FC<SelectInputProps> = ({ label, defaultValue, selectOptions, labelId }) => {
    return (
        <section className="form-fields">
            <label id={labelId}>{label}</label>
            <select defaultValue={defaultValue}>
                {selectOptions.map((option,index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </section>   
    )
}

export default SelectInput