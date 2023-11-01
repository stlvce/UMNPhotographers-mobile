import { forwardRef } from "react";
import MainInput from "./MainInput";
import validateVk from "../../utils/validators/validateVk";

const VkInput = ({ value, handler }, ref) => {
  return (
    <MainInput
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
