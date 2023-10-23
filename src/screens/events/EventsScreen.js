import { ScrollView, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import iconPng from "../../../assets/icon.png";

const events = [
  {
    title: "EVENT 1",
    imgSrc: iconPng,
    description:
      "asdkoqwpeoqwpekpqowkeoqwekrpokqweporkqpwoekrpqowekrpqowekrpqowkerpoqkwerpokqweprokwqpekrp",
  },
  {
    title: "EVENT 2",
    imgSrc: iconPng,
    description:
      "asdkoqwpeoqwpekpqowkeoqwekrpokqweporkqpwoekrpqowekrpqowekrpqowkerpoqkwerpokqweprokwqpekrp",
  },
  {
    title: "EVENT 3",
    imgSrc: iconPng,
    description:
      "asdkoqwpeoqwpekpqowkeoqwekrpokqweporkqpwoekrpqowekrpqowekrpqowkerpoqkwerpokqweprokwqpekrp",
  },
];

const EventsScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#FFF",
  },
  card: {
    marginBottom: 10,
  },
});

export default EventsScreen;
