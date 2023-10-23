import { TextInput } from "react-native-paper";

const EmailInput = ({ value, handler }) => {
  return (
    <TextInput
      label="Яндекс почта"
      mode="outlined"
      textContentType="emailAddress"
      value={value}
      onChangeText={(e) => handler("email", e)}
    />
  );
};

export default EmailInput;
