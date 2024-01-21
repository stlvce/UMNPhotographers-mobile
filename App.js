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
    primary: "#2196F3",
    surfaceVariant: "#DEE1F8",
    secondaryContainer: "rgb(222,226,248)",
    background: "rgb(250,251,255)",
    navigatorContainer: "#FFF",
    bottomNavIcon: "#000",
    success: "#46b946",
    dropMenuBackground: "#F6F6FF",
    cardBackground: "#f6f6ff",
    searchBackground: "#E7E9F4",
    bannerBackground: "#F6F6FF",
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
