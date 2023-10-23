import { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Banner } from "react-native-paper";
import EmailInput from "../components/inputs/EmailInput";
import PassInput from "../components/inputs/PassInput";

const AuthScreen = ({ navigation }) => {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [isVisibleBanner, setIsVisibleBanner] = useState(true);

  const handleChange = (name, value) => {
    setAuthData({ ...authData, [name]: value });
  };

  const handleSubmit = () => {
    navigation.push("Main");
  };

  const startRegister = useCallback(() => {
    navigation.push("Регистрация");
  }, []);

  return (
    <View style={styles.container}>
      {/* TODO: из-за названия есть доп. отступ */}
      {/* TODO: соброс фокуса при нажатии на другое место */}
      <EmailInput value={authData.email} handler={handleChange} />
      <PassInput value={authData.password} handler={handleChange} />
      <Button mode="contained" onPress={handleSubmit}>
        Войти
      </Button>
      {/* TODO: написать табличку статуса */}
      <Banner
        visible={isVisibleBanner}
        actions={[
          {
            label: "Закрыть",
            onPress: () => setIsVisibleBanner(false),
          },
        ]}
      >
        There was a problem processing a transaction on your credit card.
      </Banner>
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
});

export default AuthScreen;
