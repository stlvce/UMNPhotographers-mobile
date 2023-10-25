import { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, useTheme } from "react-native-paper";
import EmailInput from "../inputs/EmailInput";

const ContactForm = ({ value, handler }) => {
  const theme = useTheme();
  const [addedContact, setAddedContact] = useState(0);

  const addContact = useCallback(() => {
    addedContact < 5 && setAddedContact((prev) => ++prev);
  }, [setAddedContact]);

  const deleteContact = useCallback(() => {
    setAddedContact((prev) => --prev);
  }, [setAddedContact]);

  return (
    <View style={styles.containerForm}>
      <Text variant="titleLarge">Контакты</Text>
      <EmailInput />
      <TextInput label="Номер телефона" mode="outlined" />
      <TextInput label="@telegram" mode="outlined" />
      <TextInput label="Ссылка на вк" mode="outlined" />
      {[...Array(addedContact).keys()]?.map((number) => (
        <TextInput
          label={`Доп. контакт №${number + 1}`}
          mode="outlined"
          key={number + 1}
          right={
            <TextInput.Icon
              icon="delete"
              color={theme.colors.error}
              onPress={deleteContact}
            />
          }
        />
      ))}
      <Button icon="plus" onPress={addContact}>
        Добавить контакт (Доступно: {5 - addedContact})
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  containerForm: {
    gap: 10,
    marginBottom: 20,
  },
});

export default ContactForm;
