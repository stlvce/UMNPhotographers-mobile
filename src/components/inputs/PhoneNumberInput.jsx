import { useEffect, useState } from "react";
import { forwardRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import MainInput from "./MainInput";
import validatePhone from "../../utils/validators/validatePhone";

const PhoneNumberInput = ({ value, handler, isLoading = false }, ref) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleChangeVisible = () => {
    if (!Boolean(value)) {
      setIsVisible(!isVisible);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (!isLoading && !(value === "")) {
      setIsVisible(true);
    }
  }, [isLoading]);

  return (
    <View>
      {isVisible && <Text style={styles.numberPhoneStart}>+7</Text>}
      <MainInput
        contentStyle={styles.contentInput}
        label="Номер телефона"
        textContentType="telephoneNumber"
        keyboardType="number-pad"
        maxLength={10}
        contextMenuHidden
        varName="phone"
        value={value}
        handler={handler}
        validator={validatePhone}
        onFocus={handleChangeVisible}
        handleVisibleText={handleChangeVisible}
        ref={ref}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentInput: {
    marginLeft: 12,
  },
  numberPhoneStart: {
    position: "absolute",
    zIndex: 1,
    top: 23,
    left: 10,
    fontSize: 15,
  },
});

export default forwardRef(PhoneNumberInput);
