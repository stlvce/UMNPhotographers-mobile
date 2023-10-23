import { View, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";

const FullNameForm = ({ containerTitle, value, handler }) => {
  return (
    <View style={styles.containerForm}>
      <Text variant="titleLarge">{containerTitle}</Text>
      <TextInput label="Фамилия*" mode="outlined" />
      <TextInput label="Имя*" mode="outlined" />
      <TextInput label="Отчество" mode="outlined" />
    </View>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    gap: 10,
    marginBottom: 20,
  },
});

export default FullNameForm;
