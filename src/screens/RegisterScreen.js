import { useCallback, useRef, useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Text, Avatar, Portal } from "react-native-paper";
import FullNameForm from "../components/forms/FullNameForm";
import ContactForm from "../components/forms/ContactForm";
import PortfolioForm from "../components/forms/PortfolioForm";
import PassForm from "../components/forms/PassForm";
import ActionConfirmDialog from "../modals/ActionConfirmDialog";
import BirthdateInput from "../components/inputs/BirthdateInput";
import { useAuthRegisterMutatuin } from "../api/authApi";

const initialUserData = {
  firstname: "",
  surname: "",
  middleName: "",
  birthdate: "",
  email: "",
  phone: "",
  tg: "",
  vk: "",
  password: "",
};

const RegisterScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const isValidFullNameRef = useRef(null);
  const isValidContactsRef = useRef(null);
  const isValidPasswordRef = useRef(null);
  const [handleAuthRegister, { data, isError, error, isLoading, status }] =
    useAuthRegisterMutatuin();

  const handleChange = useCallback(
    (name, value) => {
      setUserData({ ...userData, [name]: value });
    },
    [userData]
  );

  const handleSubmit = useCallback(() => {
    changeVisibleDialog();
    if (
      isValidFullNameRef.current &&
      isValidContactsRef.current &&
      isValidPasswordRef.current
    ) {
      handleAuthRegister;
      navigation.goBack();
    }
  }, [userData]);

  const changeVisibleDialog = useCallback(() => {
    setVisibleDialog((prev) => !prev);
  }, [setVisibleDialog]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerKeyboard}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{
            ...styles.container,
            marginBottom: Keyboard.isVisible() ? 20 : 20,
          }}
        >
          <FullNameForm
            containerTitle="О себе"
            value={[userData.firstname, userData.surname, userData.middleName]}
            handler={handleChange}
            ref={isValidFullNameRef}
          />
          <View style={styles.containerForm}>
            <Text variant="titleLarge">Дата рождения</Text>
            <BirthdateInput value={userData.birthdate} handler={handleChange} />
          </View>
          {/* TODO: сделать загрузку фотографии */}
          <View style={{ ...styles.containerImage, ...styles.containerForm }}>
            <Text variant="titleLarge">Фотография</Text>
            <Avatar.Image size={100} />
          </View>
          <ContactForm
            value={[userData.email, userData.phone, userData.tg, userData.vk]}
            handler={handleChange}
            ref={isValidContactsRef}
          />
          {/* TODO: доделать ссылку на портфолио */}
          <PortfolioForm value="" />
          <PassForm
            password={userData.password}
            handler={handleChange}
            ref={isValidPasswordRef}
          />
          <Button
            mode="contained"
            style={styles.button}
            onPress={changeVisibleDialog}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
    backgroundColor: "#FFF",
  },
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
