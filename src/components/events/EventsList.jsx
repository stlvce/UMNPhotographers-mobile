import { View } from "react-native";
import EventCard from "./EventCard";
import StateScreen from "../ui/StateScreen";

const EventsList = ({ navigation, data, isError }) => {
  if (!Boolean(data?.list)) {
    return <StateScreen message="Нет активных мероприятий" isError={isError} />;
  }
  return (
    <View>
      {data?.list?.map((event) => (
        <EventCard navigation={navigation} event={event} key={event.name} />
      ))}
    </View>
  );
};

export default EventsList;
