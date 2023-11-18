import { forwardRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import MainInput from "./MainInput";
import validatePhone from "../../utils/validators/validatePhone";

const PhoneNumberInput = ({ value, handler }, ref) => {
  return (
    <View style={styles.numberPhone}>
      {/* TODO: переделать на форматирование через регулярное выражение */}
      <Text style={styles.numberPhoneStart} variant="titleLarge">
        +7
      </Text>
      <MainInput
        label="Номер телефона"
        textContentType="telephoneNumber"
        keyboardType="number-pad"
        maxLength={10}
        contextMenuHidden
        varName="phone"
        value={value}
        handler={handler}
        validator={validatePhone}
        ref={ref}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  numberPhone: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  numberPhoneStart: {
    marginTop: 10,
  },
});

export default forwardRef(PhoneNumberInput);
