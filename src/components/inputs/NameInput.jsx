import { forwardRef, useState } from "react";
import validateName from "../../utils/validators/validateName";
import UserDataInput from "../ui/UserDataInput";

const NameInput = ({ label, varName, value, handler }, ref) => {
  return (
    <UserDataInput
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
