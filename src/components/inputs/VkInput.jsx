import { forwardRef } from "react";
import UserDataInput from "../ui/UserDataInput";
import validateVk from "../../utils/validators/validateVk";

const VkInput = ({ value, handler }, ref) => {
  return (
    <UserDataInput
      label="Ссылка на вк"
      maxLength={32}
      varName="vk"
      autoCapitalize="none"
      value={value}
      handler={handler}
      validator={validateVk}
      ref={ref}
    />
  );
};

export default forwardRef(VkInput);
