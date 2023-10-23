import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventsScreen from "../screens/events/EventsScreen";
import TechScreen from "../screens/TechScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EventsNavigator from "./EventsNavigator";
import { Icon } from "react-native-paper";

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Events">
      <Tab.Screen
        name="Events"
        component={EventsNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              source="calendar-search"
              size={25}
              color={focused ? "#0AF" : "#000"}
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
              color={focused ? "#0AF" : "#000"}
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
              color={focused ? "#0AF" : "#000"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
