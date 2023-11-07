import { useState, forwardRef } from "react";
import { TextInput, HelperText } from "react-native-paper";
import { View } from "react-native";

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
    <View>
      <TextInput
        mode="outlined"
        value={value}
        onChangeText={handleChange}
        onBlur={handleBlur}
        error={isError}
        {...props}
      />
      {/* <HelperText type="error" visible={isError} padding="none">
        Data is invalid!
      </HelperText> */}
    </View>
  );
};

export default forwardRef(MainInput);
