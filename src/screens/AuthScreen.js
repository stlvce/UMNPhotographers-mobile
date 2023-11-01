import { useCallback, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button } from "react-native-paper";
import EmailInput from "../components/inputs/EmailInput";
import PassInput from "../components/inputs/PassInput";
import StatusBanner from "../components/StatusBanner";

const AuthScreen = ({ navigation }) => {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [isVisibleBanner, setIsVisibleBanner] = useState(false);
  const isValidEmailRef = useRef(null);
  const isValidPasswordRef = useRef(null);

  const handleChange = useCallback(
    (name, value) => {
      setAuthData({ ...authData, [name]: value });
    },
    [authData]
  );

  const handleSubmit = useCallback(() => {
    // TODO: убрать возможность возвращения
    // navigation.replace("Main");
    navigation.navigate("Main");
  }, [authData]);

  const changeVisibleBanner = useCallback(() => {
    setIsVisibleBanner((prev) => !prev);
  }, [setIsVisibleBanner]);

  const startRegister = useCallback(() => {
    navigation.push("Регистрация");
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerKeyboard}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* TODO: соброс фокуса при нажатии на другое место не работает (из-за View) */}
          <View style={styles.containerForm}>
            <EmailInput
              value={authData.email}
              handler={handleChange}
              ref={isValidEmailRef}
            />
            <PassInput
              label="Пароль"
              value={authData.password}
              handler={handleChange}
              ref={isValidPasswordRef}
            />
          </View>
          <Button mode="contained" onPress={handleSubmit}>
            Войти
          </Button>
          <StatusBanner
            status="Ошибка"
            visible={isVisibleBanner}
            changeVisible={changeVisibleBanner}
          />
          <Button mode="outlined" onPress={startRegister}>
            Регистрация
          </Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 20,
    backgroundColor: "#FFF",
  },
  containerForm: {
    gap: 10,
  },
});

export default AuthScreen;
