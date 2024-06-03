import PropTypes from 'prop-types';

const FormFields = ({ label, inputType = 'text', labelId = '', defaultValue = '', isSelect = false, selectOptions = [] }) => {
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

FormFields.prototypes = {
  label: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  labelId: PropTypes.string,
  defaultValue: PropTypes.string,
  isSelect: PropTypes.bool,
  selectOptions: PropTypes.arrayOf(PropTypes.string)
};

export default FormFields