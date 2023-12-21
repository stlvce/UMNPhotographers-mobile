import { forwardRef, useState } from "react";
import { TextInput } from "react-native-paper";
import validatePassword from "../../utils/validators/validatePassword";
import MainInput from "./MainInput";

const PassInput = ({ value, handler }, ref) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const handleChangeVisiblePass = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  return (
    <MainInput
      label="Пароль"
      textContentType="password"
      maxLength={25}
      autoCapitalize="none"
      // при скрытии и вводе стирается предыдущий текст (Возможно такое только на IOS)
      secureTextEntry={!isVisiblePassword}
      right={
        <TextInput.Icon
          icon="eye"
          onPress={handleChangeVisiblePass}
          forceTextInputFocus={false}
        />
      }
      varName="password"
      value={value}
      handler={handler}
      validator={validatePassword}
      ref={ref}
    />
  );
};

export default forwardRef(PassInput);
