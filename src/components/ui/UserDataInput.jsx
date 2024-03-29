import { useState, forwardRef } from "react";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import { View } from "react-native";

const UserDataInput = (
  { varName, value, handler, validator, handleVisibleText = null, ...props },
  ref,
) => {
  const theme = useTheme();
  const [isBlur, setIsBlur] = useState(false);
  const isError = value !== "" && isBlur && !ref.current;

  const handleChange = (e) => {
    setIsBlur(false);
    handler(varName, e);
  };

  const handleBlur = () => {
    setIsBlur(true);
    ref.current = validator(value);
    if (varName === "phone") {
      handleVisibleText();
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
        right={
          ref.current &&
          isBlur && <TextInput.Icon icon="check" color={theme.colors.success} />
        }
        outlineColor={
          ref.current && isBlur ? theme.colors.success : theme.colors.secondary
        }
        {...props}
      />
      {/*      <HelperText type="error" visible={isError} padding="none">
        Data is invalid!
      </HelperText>*/}
    </View>
  );
};

export default forwardRef(UserDataInput);
