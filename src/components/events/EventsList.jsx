import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { useReceiveEventListQuery } from "../../api/eventApi";
import Loader from "../ui/Loader";

const EventsList = ({ navigation }) => {
  const { data, isLoading, isError } = useReceiveEventListQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <View>
      {Boolean(data?.list) ? (
        data?.list?.map((event) => (
          <Card
            style={styles.card}
            key={event.name}
            onPress={() => navigation.navigate("Мероприятие", event)}
          >
            <Card.Title title={event.name} subtitle={event.address} />
            <Card.Content>
              <Text variant="bodyMedium">Начало: {event.startTime}</Text>
              <Text variant="bodyMedium">Конец: {event.endTime}</Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text style={styles.textState}>
          {isError ? "Ошибка" : "Нет активных мероприятий"}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  textState: {
    textAlign: "center",
    marginTop: 20,
  },
});

export default EventsList;
