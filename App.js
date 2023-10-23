import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./src/Main";

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Main />
        <StatusBar style="auto" />
      </NavigationContainer>
    </PaperProvider>
  );
}
