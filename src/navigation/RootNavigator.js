import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomNavigator from "./BottomNavigator";
import RootAppBar from "../components/RootAppBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { checkSessionId, logout } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useRegisterPNs from "../hooks/useRegisterPNs";
import { useAuthPingQuery } from "../api/authApi";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const dispatch = useDispatch();
  const activeRootScreen = useSelector((state) => state.auth.activeRootScreen);
  const getIdSession = async () => {
    let idSession = await AsyncStorage.getItem("SESSION");
    if (isError) {
      await dispatch(logout());
      dispatch(checkSessionId(""));
      return;
    }
    dispatch(checkSessionId(idSession));
  };
  const expoPushToken = useRegisterPNs();
  const { isError, data } = useAuthPingQuery();

  useEffect(() => {
    getIdSession();
  }, [isError]);

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
