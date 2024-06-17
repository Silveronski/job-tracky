import React from "react";
import RegularInput from "./RegularInput";
import SelectInput from "./SelectInput";
import FileInput from "./FileInput";

type FormFieldsProps = RegularInputProps | SelectInputProps | FileInputProps;

const FormFields: React.FC<FormFieldsProps> = (props) => {
  switch (props.inputType) {
    case 'regular':
      return <RegularInput {...props}/>
    case 'select':
      return <SelectInput {...props}/>
    case 'file':
      return <FileInput {...props}/>
    default:
      return null;
  }
};

export default FormFields