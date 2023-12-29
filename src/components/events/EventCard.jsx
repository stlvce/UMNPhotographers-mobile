import { StyleSheet, View } from "react-native";
import { Card, Text, ProgressBar, MD3Colors } from "react-native-paper";

const EventCard = ({ navigation, event }) => {
  const dateStart = event.startTime.split("T");
  const dateEnd = event.endTime.split("T");
  const level = event.level / 10;

  const levelColor = (value) => {
    if (value < 0.4) {
      return "#39d039";
    }

    if (value >= 0.4 && value <= 0.7) {
      return "rgba(238,238,47,0.98)";
    }

    if (value > 0.7) {
      return MD3Colors.error60;
    }

    return MD3Colors.primary70;
  };

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
        <View style={styles.progressBarContainer}>
          <View style={styles.flexRow}>
            <Text style={styles.propertyTitle} variant="bodyMedium">
              Сложность
            </Text>
            <Text style={styles.levelCount} variant="bodyMedium">
              {event.level}
            </Text>
          </View>

          <ProgressBar progress={level} color={levelColor(level)} />
        </View>
        <View style={styles.flexRow}>
          <View>
            <Text style={styles.propertyTitle} variant="bodyMedium">
              Начало
            </Text>
            <Text variant="bodyMedium">{`${dateStart[0]
              .split("-")
              .reverse()
              .join(".")} ${dateStart[1]}`}</Text>
          </View>
          <View>
            <Text style={styles.propertyTitle} variant="bodyMedium">
              Конец
            </Text>
            <Text variant="bodyMedium">{`${dateEnd[0]
              .split("-")
              .reverse()
              .join(".")} ${dateEnd[1]}`}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  contentContainer: { marginTop: 20, gap: 15 },
  progressBarContainer: {
    gap: 7,
  },
  levelCount: {
    alignSelf: "flex-end",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  propertyTitle: {
    opacity: 0.7,
  },
});

export default EventCard;
