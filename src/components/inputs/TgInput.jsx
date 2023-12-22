import { forwardRef } from "react";
import UserDataInput from "../ui/UserDataInput";
import validateTg from "../../utils/validators/validateTg";

const TgInput = ({ value, handler }, ref) => {
  return (
    <UserDataInput
      label="Telegram"
      maxLength={32}
      varName="tg"
      autoCapitalize="none"
      value={value}
      handler={handler}
      validator={validateTg}
      ref={ref}
    />
  );
};

export default forwardRef(TgInput);
