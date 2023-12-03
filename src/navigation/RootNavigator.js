import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomNavigator from "./BottomNavigator";
import RootAppBar from "../components/RootAppBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { checkSessionId } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();
  const activeRootScreen = useSelector((state) => state.auth.activeRootScreen);
  const getIdSession = async () => {
    let idSession = await AsyncStorage.getItem("SESSION");
    dispatch(checkSessionId(idSession));
  };

  // TODO: сделать выход при истечении сессии
  useEffect(() => {
    getIdSession();
  }, []);

  if (!Boolean(activeRootScreen)) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFF",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={activeRootScreen}
      screenOptions={{
        header: (props) => <RootAppBar {...props} />,
      }}
    >
      <Stack.Screen name="Вход" component={AuthScreen} />
      <Stack.Screen name="Регистрация" component={RegisterScreen} />
      <Stack.Screen
        name="Main"
        component={BottomNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
