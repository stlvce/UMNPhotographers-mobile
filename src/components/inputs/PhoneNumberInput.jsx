import { forwardRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import MainInput from "./MainInput";
import validatePhone from "../../utils/validators/validatePhone";

const PhoneNumberInput = ({ value, handler }, ref) => {
  return (
    <View style={styles.numberPhone}>
      <Text style={styles.numberPhoneStart} variant="titleMedium">
        +7
      </Text>
      <MainInput
        style={{ flex: 1 }}
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
