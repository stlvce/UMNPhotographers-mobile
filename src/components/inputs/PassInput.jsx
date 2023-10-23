import { TextInput } from "react-native-paper";

const PassInput = ({ value, handler }) => {
  return (
    <TextInput
      label="Пароль"
      mode="outlined"
      textContentType="password"
      value={value}
      onChangeText={(e) => handler("password", e)}
    />
  );
};

export default PassInput;
