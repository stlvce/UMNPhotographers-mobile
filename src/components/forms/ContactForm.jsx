import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import EmailInput from "../inputs/EmailInput";

const ContactForm = ({ value, handler }) => {
  const [addedContact, setAddedContact] = useState([]);

  const addContact = () => {
    addedContact.length < 5 &&
      setAddedContact([...addedContact, addedContact.length + 1]);
  };

  return (
    <View style={styles.containerForm}>
      <Text variant="titleLarge">Контакты</Text>
      <EmailInput />
      <TextInput label="Номер телефона" mode="outlined" />
      <TextInput label="@telegram" mode="outlined" />
      <TextInput label="Ссылка на вк" mode="outlined" />
      {addedContact?.map((number) => (
        <TextInput
          label={`Доп. контакт №${number}`}
          mode="outlined"
          key={number}
        />
      ))}
      <Button icon="plus" onPress={addContact}>
        Добавить контакт (Доступно: {5 - addedContact.length})
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
