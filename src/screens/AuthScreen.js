import { useCallback, useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Button } from "react-native-paper";
import EmailInput from "../components/inputs/EmailInput";
import PassInput from "../components/inputs/PassInput";
import StatusBanner from "../components/StatusBanner";
import { useAuthLoginMutation } from "../api/authApi";
import validatePassword from "../utils/validators/validatePassword";

const AuthScreen = ({ navigation }) => {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [isVisibleBanner, setIsVisibleBanner] = useState(false);
  const isValidEmailRef = useRef(null);
  const isValidPasswordRef = useRef(null);
  // const isValid = isValidEmailRef.current && isValidPasswordRef.current;
  const [handleAuthLogin, { data, isError, error, isLoading, status }] =
    useAuthLoginMutation();

  const handleChange = useCallback(
    (name, value) => {
      setAuthData({ ...authData, [name]: value });
    },
    [authData]
  );

  const handleSubmit = useCallback(() => {
    // вместо валидации при blur на пароле
    isValidPasswordRef.current = validatePassword(authData.password);
    const isValid = isValidEmailRef.current && isValidPasswordRef.current;
    if (isValid) {
      setIsVisibleBanner(false);
      handleAuthLogin(authData);
    }
  }, [authData]);

  const changeVisibleBanner = useCallback(() => {
    setIsVisibleBanner((prev) => !prev);
  }, [setIsVisibleBanner]);

  const startRegister = useCallback(() => {
    navigation.push("Регистрация");
  }, []);

  useEffect(() => {
    if (
      status === "fulfilled" &&
      data.authenticate &&
      data.status === "approved"
    ) {
      navigation.replace("Main");
    } else {
      if (isError || data?.status === "blocked" || data?.status === "created") {
        setIsVisibleBanner(true);
      }
    }
  }, [status]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerKeyboard}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator animating={true} size="large" />
          ) : (
            <>
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
                data={data}
                error={error}
                visible={isVisibleBanner}
                changeVisible={changeVisibleBanner}
              />
              <Button
                style={styles.buttonRegister}
                mode="outlined"
                onPress={startRegister}
              >
                Регистрация
              </Button>
            </>
          )}
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
  buttonRegister: {
    marginTop: 20,
  },
});

export default AuthScreen;
