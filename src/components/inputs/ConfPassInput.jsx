import { forwardRef, useState } from "react";
import { TextInput } from "react-native-paper";

const ConfPassInput = ({ value, handler, password }, ref) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const isError = value !== "" && isBlur && !ref.current;

  const handleChange = (e) => {
    setIsBlur(false);
    handler("confPass", e);
  };

  const handleChangeVisiblePass = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  const handleBlur = () => {
    ref.current = password === value;
    if (ref.current) {
      setIsBlur(false);
    } else {
      setIsBlur(true);
    }
  };

  return (
    <TextInput
      label="Подтверждение пароля"
      mode="outlined"
      textContentType="password"
      maxLength={25}
      autoCapitalize="none"
      secureTextEntry={!isVisiblePassword}
      right={
        <TextInput.Icon
          icon="eye"
          onPress={handleChangeVisiblePass}
          forceTextInputFocus={false}
        />
      }
      value={value}
      onChangeText={handleChange}
      onBlur={handleBlur}
      error={isError}
    />
  );
};

export default forwardRef(ConfPassInput);
