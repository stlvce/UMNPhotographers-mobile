import { View, StyleSheet } from "react-native";
import { Text, TextInput } from "react-native-paper";

const PortfolioForm = ({ value, handler }) => {
  return (
    <View style={styles.containerForm}>
      <Text variant="titleLarge">Портфолио</Text>
      <TextInput label="Ссылка на портфолио" mode="outlined" />
    </View>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    gap: 10,
    marginBottom: 20,
  },
});

export default PortfolioForm;
