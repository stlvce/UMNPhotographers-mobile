import { forwardRef, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import EmailInput from "../inputs/EmailInput";
import PhoneNumberInput from "../inputs/PhoneNumberInput";
import TgInput from "../inputs/TgInput";
import VkInput from "../inputs/VkInput";

const ContactForm = ({ value, handler, isLoading = false }, ref) => {
  const [email, phone, tg, vk] = value;
  const isValidEmailRef = useRef(null);
  const isValidNumberRef = useRef(null);
  const isValidTgRef = useRef(null);
  const isValidVkRef = useRef(null);

  ref.current =
    isValidEmailRef.current &&
    isValidNumberRef.current &&
    isValidTgRef.current &&
    isValidVkRef.current;

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Контакты</Text>
      <EmailInput value={email} handler={handler} ref={isValidEmailRef} />
      <PhoneNumberInput
        value={phone}
        handler={handler}
        isLoading={isLoading}
        ref={isValidNumberRef}
      />
      <TgInput value={tg} handler={handler} ref={isValidTgRef} />
      <VkInput value={vk} handler={handler} ref={isValidVkRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 20,
  },
});

export default forwardRef(ContactForm);
