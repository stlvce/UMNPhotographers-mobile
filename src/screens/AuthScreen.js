import { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
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

  const handleChange = useCallback(
    (name, value) => {
      setAuthData({ ...authData, [name]: value });
    },
    [setAuthData]
  );

  const handleSubmit = useCallback(() => {
    // TODO: убрать возможность возвращения здесь и в RegisterScreen
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
    <View style={styles.container}>
      {/* TODO: соброс фокуса при нажатии на другое место не работает (из-за View) */}
      <View style={styles.containerForm}>
        <EmailInput value={authData.email} handler={handleChange} />
        <PassInput value={authData.password} handler={handleChange} />
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
  );
};

const styles = StyleSheet.create({
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
