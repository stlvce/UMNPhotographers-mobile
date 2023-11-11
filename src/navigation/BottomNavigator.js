import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventsNavigator from "./EventsNavigator";
import TechNavigator from "./TechNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import { Icon, useTheme } from "react-native-paper";
import RootAppBar from "../components/RootAppBar";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const theme = useTheme();

  // TODO: изменить язык на нажнем английский
  return (
    <Tab.Navigator
      initialRouteName="Events"
      screenOptions={{
        header: (props) => <RootAppBar {...props} />,
        tabBarActiveTintColor: theme.colors.primary,
      }}
    >
      <Tab.Screen
        name="Events"
        component={EventsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              source="calendar-search"
              size={25}
              color={focused ? theme.colors.primary : "#000"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tech"
        component={TechNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              source="camera-iris"
              size={25}
              color={focused ? theme.colors.primary : "#000"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              source="account"
              size={25}
              color={focused ? theme.colors.primary : "#000"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
