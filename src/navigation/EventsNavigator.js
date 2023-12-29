import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventsScreen from "../screens/events/EventsScreen";
import EventScreen from "../screens/events/EventScreen";
import RequestScreen from "../screens/events/RequestScreen";
import YourCalendarScreen from "../screens/events/YourCalendarScreen";
import TimetableScreen from "../screens/events/TimetableScreen";
import RootAppBar from "../components/RootAppBar";
import PrioritiesScreen from "../screens/events/PrioritiesScreen";
import FreeTimeScreen from "../screens/events/FreeTimeScreen";

const Stack = createNativeStackNavigator();

const EventsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Events"
      screenOptions={{
        header: (props) => <RootAppBar {...props} />,
      }}
    >
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen
        name="Мероприятие"
        component={EventScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <Stack.Screen name="Ваш календарь" component={YourCalendarScreen} />
      <Stack.Screen name="Заявка на участие" component={RequestScreen} />
      <Stack.Screen name="Расписание мероприятия" component={TimetableScreen} />
      <Stack.Screen name="Приоритеты" component={PrioritiesScreen} />
      <Stack.Screen name="Удобное время" component={FreeTimeScreen} />
    </Stack.Navigator>
  );
};

export default EventsNavigator;
