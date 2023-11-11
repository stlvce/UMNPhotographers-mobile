import { useCallback, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Portal } from "react-native-paper";
import FullNameForm from "../components/forms/FullNameForm";
import ContactForm from "../components/forms/ContactForm";
import PortfolioForm from "../components/forms/PortfolioForm";
import PassForm from "../components/forms/PassForm";
import ActionConfirmDialog from "../modals/ActionConfirmDialog";
import BirthdateInput from "../components/inputs/BirthdateInput";
import { useAuthRegisterMutation } from "../api/authApi";
import UploadAvatarInput from "../components/forms/UploadAvatarInput";

const initialUserData = {
  firstname: "",
  surname: "",
  middleName: "",
  birthdate: "",
  email: "",
  phone: "",
  tg: "",
  vk: "",
  portfolio: "",
  password: "",
  confPass: "",
};

const RegisterScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [visibleDialog, setVisibleDialog] = useState(false);
  const [handleAuthRegister, { data }] = useAuthRegisterMutation();
  const isValidFullNameRef = useRef(null);
  const isValidContactsRef = useRef(null);
  const isValidPasswordRef = useRef(null);
  const isValidPortfolioRef = useRef(null);

  const isValid =
    isValidFullNameRef.current &&
    isValidContactsRef.current &&
    isValidPasswordRef.current &&
    isValidPortfolioRef.current &&
    userData.birthdate !== "" &&
    userData.password === userData.confPass;

  const handleChange = useCallback(
    (name, value) => {
      setUserData({ ...userData, [name]: value });
    },
    [userData],
  );

  const handleSubmit = useCallback(() => {
    if (isValid) {
      changeVisibleDialog();
      handleAuthRegister(userData);
      navigation.goBack();
    }
  }, [userData, isValid]);

  const changeVisibleDialog = useCallback(() => {
    if (isValid) {
      setVisibleDialog((prev) => !prev);
    }
  }, [visibleDialog, isValid]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerKeyboard}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{
            ...styles.container,
            marginBottom: Keyboard.isVisible() ? 100 : 20,
          }}
        >
          <FullNameForm
            containerTitle="О себе"
            value={[userData.firstname, userData.surname, userData.middleName]}
            handler={handleChange}
            ref={isValidFullNameRef}
          />
          <BirthdateInput value={userData.birthdate} handler={handleChange} />
          <UploadAvatarInput />
          <ContactForm
            value={[userData.email, userData.phone, userData.tg, userData.vk]}
            handler={handleChange}
            ref={isValidContactsRef}
          />
          <PortfolioForm
            value={userData.portfolio}
            handler={handleChange}
            ref={isValidPortfolioRef}
          />
          <PassForm
            value={[userData.password, userData.confPass]}
            handler={handleChange}
            ref={isValidPasswordRef}
          />
          <Button
            mode="contained"
            style={styles.button}
            onPress={changeVisibleDialog}
            disabled={!isValid}
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
  button: {
    marginTop: 20,
    marginBottom: 40,
  },
});

export default RegisterScreen;
