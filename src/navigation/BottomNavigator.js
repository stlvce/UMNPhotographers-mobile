import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventsNavigator from "./EventsNavigator";
import TechNavigator from "./TechNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import { Icon, useTheme } from "react-native-paper";
import RootAppBar from "../components/RootAppBar";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Мероприятия"
      screenOptions={{
        header: (props) => <RootAppBar {...props} />,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.secondary,
        tabBarHideOnKeyboard: Platform.OS === "android",
      }}
    >
      <Tab.Screen
        name="Мероприятия"
        component={EventsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              source="calendar-search"
              size={25}
              color={
                focused ? theme.colors.primary : theme.colors.bottomNavIcon
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Техника"
        component={TechNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              source="camera-iris"
              size={25}
              color={
                focused ? theme.colors.primary : theme.colors.bottomNavIcon
              }
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
              color={
                focused ? theme.colors.primary : theme.colors.bottomNavIcon
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
