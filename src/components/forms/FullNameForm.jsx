import { forwardRef, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";
import NameInput from "../inputs/NameInput";

const FullNameForm = ({ containerTitle, value, handler }, ref) => {
  const [firstName, surname, middleName] = value;
  const isValidSurnameRef = useRef(null);
  const isValidFirstnameRef = useRef(null);
  const isValidMiddlenameRef = useRef(null);

  ref.current = Boolean(middleName)
    ? isValidSurnameRef && isValidFirstnameRef && isValidMiddlenameRef
    : isValidSurnameRef && isValidFirstnameRef;

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">{containerTitle}</Text>
      <NameInput
        label="Фамилия*"
        varName="surname"
        value={surname}
        handler={handler}
        ref={isValidSurnameRef}
      />
      <NameInput
        label="Имя*"
        varName="firstName"
        value={firstName}
        handler={handler}
        ref={isValidFirstnameRef}
      />
      <NameInput
        label="Отчество"
        varName="middleName"
        value={middleName}
        handler={handler}
        ref={isValidMiddlenameRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 20,
  },
});

export default forwardRef(FullNameForm);
