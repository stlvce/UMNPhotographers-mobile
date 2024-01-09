import { StyleSheet, View } from "react-native";
import { Card, Text, useTheme, Icon } from "react-native-paper";
import LevelBar from "./LevelBar";
import { useSelector } from "react-redux";

const EventCard = ({ navigation, event }) => {
  const theme = useTheme();
  const userEventListID = useSelector((state) => state.event.userEventListID);
  const dateStart = event.startTime.split("T");
  const dateEnd = event.endTime.split("T");

  return (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate("Мероприятие", event)}
    >
      {userEventListID.find((eventId) => eventId === event.id) && (
        <Card.Content
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 5,
          }}
        >
          <Icon size={15} source="check" color={theme.colors.success} />
          <Text style={{ color: theme.colors.success }}>Вы участвуете</Text>
        </Card.Content>
      )}
      <Card.Title
        title={event.name}
        titleVariant="titleMedium"
        subtitle={event.address}
      />
      <Card.Content style={styles.contentContainer}>
        <LevelBar level={event.level} />
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
    shadowOpacity: 0.1,
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
