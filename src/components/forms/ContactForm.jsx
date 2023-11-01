import { useCallback, useState, forwardRef, useRef } from "react";
import { View, StyleSheet, TextInputMask } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import EmailInput from "../inputs/EmailInput";
import PhoneNumberInput from "../inputs/PhoneNumberInput";
import TgInput from "../inputs/TgInput";
import VkInput from "../inputs/VkInput";

const ContactForm = ({ value, handler }, ref) => {
  const theme = useTheme();
  const [email, phone, tg, vk] = value;
  const [addedContact, setAddedContact] = useState(0);
  const isValidEmailRef = useRef(null);
  const isValidNumberRef = useRef(null);
  const isValidTgRef = useRef(null);
  const isValidVkRef = useRef(null);

  ref.current =
    isValidEmailRef && isValidNumberRef && isValidTgRef && isValidVkRef;

  const addContact = useCallback(() => {
    if (addedContact < 5) {
      setAddedContact((prev) => ++prev);
    }
  }, [addedContact]);

  const deleteContact = useCallback(() => {
    setAddedContact((prev) => --prev);
  }, [addedContact]);

  return (
    <View style={styles.containerForm}>
      <Text variant="titleLarge">Контакты</Text>
      <EmailInput value={email} handler={handler} ref={isValidEmailRef} />
      <PhoneNumberInput
        value={phone}
        handler={handler}
        ref={isValidNumberRef}
      />
      <TgInput value={tg} handler={handler} ref={isValidTgRef} />
      <VkInput value={vk} handler={handler} ref={isValidVkRef} />

      {/* TODO: убрать */}
      {/* {[...Array(addedContact).keys()]?.map((number) => (
        <TextInput
          label={`Доп. контакт №${number + 1}`}
          mode="outlined"
          key={number + 1}
          right={
            <TextInput.Icon
              icon="delete"
              color={theme.colors.error}
              onPress={deleteContact}
              forceTextInputFocus={false}
            />
          }
        />
      ))}
      <Button icon="plus" onPress={addContact}>
        Добавить контакт (Доступно: {5 - addedContact})
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    gap: 10,
    marginBottom: 20,
  },
});

export default forwardRef(ContactForm);
