import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import EventCard from "./EventCard";

const EventsList = ({ navigation, data, isError }) => {
  if (!Boolean(data?.list)) {
    return (
      <Text style={styles.textState}>
        {isError ? "Ошибка" : "Нет активных мероприятий"}
      </Text>
    );
  }
  return (
    <View>
      {data?.list?.map((event) => (
        <EventCard navigation={navigation} event={event} key={event.name} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  textState: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default EventsList;
