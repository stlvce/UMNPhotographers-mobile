import { useCallback, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Button, Text, TextInput, Avatar, Portal } from "react-native-paper";
import FullNameForm from "../components/forms/FullNameForm";
import ContactForm from "../components/forms/ContactForm";
import PortfolioForm from "../components/forms/PortfolioForm";
import PassForm from "../components/forms/PassForm";
import ActionConfirmDialog from "../modals/ActionConfirmDialog";
import BirthdateInput from "../components/inputs/BirthdateInput";

const RegisterScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    surname: "",
    middleName: "",
    birthdate: "",
    contacts: {},
    email: "",
    password: "",
  });
  const [visibleDialog, setVisibleDialog] = useState(false);

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = useCallback(() => {
    changeVisibleDialog();
    // navigation.replace("Main");
    navigation.navigate("Main");
  }, [userData]);

  const changeVisibleDialog = useCallback(() => {
    setVisibleDialog((prev) => !prev);
  }, [setVisibleDialog]);

  return (
    <ScrollView style={styles.container}>
      <FullNameForm containerTitle="О себе" />
      <View style={styles.containerForm}>
        <Text variant="titleLarge">Дата рождения</Text>
        <BirthdateInput />
      </View>
      <View style={{ ...styles.containerImage, ...styles.containerForm }}>
        <Text variant="titleLarge">Фотография</Text>
        <Avatar.Text
          size={100}
          label={userData.firstName.slice(0, 1) + userData.surname.slice(0, 1)}
        />
      </View>
      <ContactForm />
      <PortfolioForm />
      <PassForm />
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => {
          console.log(visibleDialog);
          changeVisibleDialog();
        }}
      >
        Отправить
      </Button>
      <Portal>
        <ActionConfirmDialog
          question="Завершить регистрацию?"
          visible={visibleDialog}
          changeVisible={changeVisibleDialog}
          handleSubmit={handleSubmit}
        />
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
  },
  containerImage: {
    alignItems: "center",
    marginBottom: 20,
  },
  containerForm: {
    gap: 10,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default RegisterScreen;
