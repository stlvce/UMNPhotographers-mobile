import { View } from "react-native";
import EventCard from "./EventCard";
import StateScreen from "../ui/StateScreen";

const EventsList = ({ navigation, data, isError, searchQuery }) => {
  const filteredList = data?.list?.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!Boolean(data?.list)) {
    return (
      <StateScreen
        message="Нет активных мероприятий"
        isError={isError}
        marginTop={40}
      />
    );
  }

  if (filteredList.length === 0) {
    return <StateScreen message="Мероприятие не найдено" marginTop={40} />;
  }

  return (
    <View>
      {filteredList.map((event) => (
        <EventCard navigation={navigation} event={event} key={event.name} />
      ))}
    </View>
  );
};

export default EventsList;
