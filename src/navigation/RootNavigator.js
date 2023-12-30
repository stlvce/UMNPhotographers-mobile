import { useState, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BottomNavigator from "./BottomNavigator";
import RootAppBar from "../components/RootAppBar";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import { checkSession } from "../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import useRegisterPNs from "../hooks/useRegisterPNs";
import Loader from "../components/ui/Loader";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const activeRootScreen = useSelector((state) => state.auth.activeRootScreen);
  const expoPushToken = useRegisterPNs();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(checkSession()).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <Loader />
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
