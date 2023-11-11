import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

const events = [
  {
    title: "EVENT 1",
    description: "adsasd",
  },
  {
    title: "EVENT 2",
    description: "cvbnvcncnv",
  },
  {
    title: "EVENT 3",
    description: "qwerwrqewqer",
  },
];

const EventsList = ({ navigation }) => {
  return (
    <>
      {events.map((event) => (
        <Card
          style={styles.card}
          key={event.title}
          onPress={() => navigation.navigate("Мероприятие", event)}
        >
          <Card.Title title={event.title} />
          <Card.Content>
            <Text variant="bodyMedium">{event.description}</Text>
          </Card.Content>
        </Card>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
});

export default EventsList;
