import { useCallback, useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, useTheme } from "react-native-paper";
import EmailInput from "../components/inputs/EmailInput";
import PassInput from "../components/inputs/PassInput";
import StatusBanner from "../components/auth/StatusBanner";
import { useAuthLoginMutation, usePnTokenUpdateMutation } from "../api/authApi";
import { useSelector } from "react-redux";
import validatePassword from "../utils/validators/validatePassword";
import useFormUser from "../hooks/useFormUser";
import Loader from "../components/ui/Loader";

const AuthScreen = ({ navigation }) => {
  const theme = useTheme();
  const pnToken = useSelector((state) => state.auth.pnToken);
  const [authData, handleChange] = useFormUser({
    email: "",
    password: "",
  });
  const [isVisibleBanner, setIsVisibleBanner] = useState(false);
  const isValidEmailRef = useRef(null);
  const isValidPasswordRef = useRef(null);
  const [handleAuthLogin, { data, isError, error, isLoading, status }] =
    useAuthLoginMutation();
  const [handlePnTokenUpdate] = usePnTokenUpdateMutation();

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
      handlePnTokenUpdate(pnToken);
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
        <View
          style={{
            ...styles.container,
            backgroundColor: theme.colors.background,
          }}
        >
          {isLoading ? (
            <Loader />
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
  },
  containerForm: {
    gap: 10,
  },
  buttonRegister: {
    marginTop: 20,
  },
});

export default AuthScreen;
