import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/store";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    navigatorContainer: "#FFF",
    bottomNavIcon: "#000",
    success: "#42ab42",
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
