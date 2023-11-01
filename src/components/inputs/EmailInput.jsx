import { forwardRef } from "react";
import MainInput from "./MainInput";
import validateEmail from "../../utils/validators/validateEmail";

const EmailInput = ({ value, handler }, ref) => {
  return (
    <MainInput
      label="Яндекс почта"
      textContentType="emailAddress"
      inputMode="email"
      autoCapitalize="none"
      maxLength={30}
      varName="email"
      value={value}
      handler={handler}
      validator={validateEmail}
      ref={ref}
    />
  );
};

export default forwardRef(EmailInput);
