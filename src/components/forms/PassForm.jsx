import { View, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";
import PassInput from "../inputs/PassInput";

const PassForm = ({ value, handler }) => {
  return (
    <View style={styles.containerForm}>
      <Text variant="titleLarge">Пароль</Text>
      <PassInput />
      <TextInput
        label="Подтверждение пароля"
        mode="outlined"
        textContentType="password"
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

export default PassForm;
