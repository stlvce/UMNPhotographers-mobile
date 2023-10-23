import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";
import EventsScreen from "../screens/events/EventsScreen";
import EventScreen from "../screens/events/EventScreen";
import ReqeustScreen from "../screens/events/RequestScreen";
import YourCalendarScreen from "../screens/events/YourCalendarScreen";
import TimetableScreen from "../screens/events/TimetableScreen";

const Stack = createNativeStackNavigator();

const EventsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Мероприятия">
      <Stack.Screen name="Мероприятия" component={EventsScreen} />
      <Stack.Screen
        name="Мероприятие"
        component={EventScreen}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen name="Ваш календарь" component={YourCalendarScreen} />
      <Stack.Screen name="Заявка на участие" component={ReqeustScreen} />
      <Stack.Screen name="Расписание мероприятия" component={TimetableScreen} />
    </Stack.Navigator>
  );
};

export default EventsNavigator;
