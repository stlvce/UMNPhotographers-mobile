import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootAppBar from "../components/RootAppBar";
import TechScreen from "../screens/tech/TechScreen";
import AddTechScreen from "../screens/tech/AddTechScreen";

const Stack = createNativeStackNavigator();

const EventsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tech"
      screenOptions={{
        header: (props) => <RootAppBar {...props} />,
      }}
    >
      <Stack.Screen name="Tech" component={TechScreen} />
      <Stack.Screen name="Добавление техники" component={AddTechScreen} />
    </Stack.Navigator>
  );
};

export default EventsNavigator;
