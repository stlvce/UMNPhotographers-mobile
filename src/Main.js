import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "./screens/AuthScreen";
import BottomNavigator from "./navigation/BottomNavigator";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <Stack.Navigator initialRouteName="Вход">
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

export default Main;
