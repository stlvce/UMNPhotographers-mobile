import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TechScreen from "../screens/TechScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EventsNavigator from "./EventsNavigator";
import { Icon, useTheme, Text } from "react-native-paper";
import RootAppBar from "../components/RootAppBar";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const theme = useTheme();

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
        name="Техника"
        component={TechScreen}
        options={{
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
