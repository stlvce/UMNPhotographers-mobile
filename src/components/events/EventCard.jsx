import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

const EventCard = ({ navigation, event }) => {
  const dateStart = event.startTime.split("T");
  const dateEnd = event.endTime.split("T");
  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate("Мероприятие", event)}
    >
      <Card.Title
        title={event.name}
        titleVariant="titleMedium"
        subtitle={event.address}
      />
      <Card.Content style={styles.contentContainer}>
        <View>
          <Text variant="bodyMedium" style={{ opacity: 0.7 }}>
            Начало
          </Text>
          <Text variant="bodyMedium">{`${dateStart[0]
            .split("-")
            .reverse()
            .join(".")} ${dateStart[1]}`}</Text>
        </View>
        <View>
          <Text variant="bodyMedium" style={{ opacity: 0.7 }}>
            Конец
          </Text>
          <Text variant="bodyMedium">{`${dateEnd[0]
            .split("-")
            .reverse()
            .join(".")} ${dateEnd[1]}`}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  contentContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
});

export default EventCard;
