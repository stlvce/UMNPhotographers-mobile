import { forwardRef, useState } from "react";
import validateName from "../../utils/validators/validateName";
import MainInput from "./MainInput";

const NameInput = ({ label, varName, value, handler }, ref) => {
  return (
    <MainInput
      label={label}
      maxLength={30}
      varName={varName}
      value={value}
      handler={handler}
      validator={validateName}
      ref={ref}
    />
  );
};

export default forwardRef(NameInput);
