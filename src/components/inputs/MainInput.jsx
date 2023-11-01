import { useState, forwardRef } from "react";
import { TextInput } from "react-native-paper";

const MainInput = ({ varName, value, handler, validator, ...props }, ref) => {
  const [isBlur, setIsBlur] = useState(false);
  const isError = value !== "" && isBlur && !ref.current;

  const handleChange = (e) => {
    setIsBlur(false);
    handler(varName, e);
  };

  const handleBlur = () => {
    ref.current = validator(value);
    if (ref.current) {
      setIsBlur(false);
    } else {
      setIsBlur(true);
    }
  };

  return (
    <TextInput
      mode="outlined"
      value={value}
      onChangeText={handleChange}
      onBlur={handleBlur}
      error={isError}
      {...props}
    />
  );
};

export default forwardRef(MainInput);
