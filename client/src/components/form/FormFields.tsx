import React from "react";
import RegularInput from "./RegularInput";
import SelectInput from "./SelectInput";
import FileInput from "./FileInput";
import { FileInputProps, InputType, RegularInputProps, SelectInputProps } from "../../types/inputTypes";

type FormFieldsProps = RegularInputProps | SelectInputProps | FileInputProps;
    
const FormFields: React.FC<FormFieldsProps> = (props) => {
  switch (props.inputType) {
    case InputType.regular:
      return <RegularInput {...props}/>
    case InputType.select:
      return <SelectInput {...props}/>
    case InputType.file:
      return <FileInput {...props}/>
    default:
      const _exhaustiveCheck: never = props;
      throw new Error(`Unhandled input type: ${_exhaustiveCheck}`);
  }
};

export default FormFields