import { forwardRef, useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import PassInput from "../inputs/PassInput";
import ConfPassInput from "../inputs/ConfPassInput";

const PassForm = ({ value, handler, label = true }, ref) => {
  const [password, confPass] = value;
  const isValidPasswordRef = useRef(null);
  const isPassEqualRef = useRef(null);
  ref.current = isValidPasswordRef.current;

  return (
    <View style={styles.containerForm}>
      {label && <Text variant="titleLarge">Пароль</Text>}
      <PassInput
        label="Пароль"
        varName="password"
        value={password}
        handler={handler}
        ref={isValidPasswordRef}
      />
      <ConfPassInput
        value={confPass}
        handler={handler}
        password={password}
        ref={isPassEqualRef}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    gap: 10,
    marginBottom: 20,
  },
});

export default forwardRef(PassForm);
