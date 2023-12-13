import { View } from "react-native";
import { Text } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/store";
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import useRegisterPNs from "./src/hooks/useRegisterPNs";

export default function App() {
  const expoPushToken = useRegisterPNs();

  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          {/*<View>
            <Text style={{ textAlign: "center", marginTop: 50 }} selectable>
              {expoPushToken}
            </Text>
          </View>*/}

          <RootNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
