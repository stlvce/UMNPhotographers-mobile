import { forwardRef } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import MainInput from "../ui/UserDataInput";
import validateLink from "../../utils/validators/validateLink";

const PortfolioForm = ({ value, handler }, ref) => {
  return (
    <View style={styles.containerForm}>
      <Text variant="titleLarge">Портфолио</Text>
      <MainInput
        label="Ссылка на портфолио"
        multiline
        autoCapitalize="none"
        varName="portfolio"
        value={value}
        handler={handler}
        validator={validateLink}
        ref={ref}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    gap: 10,
  },
});

export default forwardRef(PortfolioForm);
