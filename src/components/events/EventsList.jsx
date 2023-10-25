import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import iconPng from "../../../assets/icon.png";

const events = [
  {
    title: "EVENT 1",
    imgSrc: iconPng,
    description: "adsasd",
  },
  {
    title: "EVENT 2",
    imgSrc: iconPng,
    description: "cvbnvcncnv",
  },
  {
    title: "EVENT 3",
    imgSrc: iconPng,
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
          <Card.Cover source={event.imgSrc} />
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
