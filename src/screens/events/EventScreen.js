import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";

const EventScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const event = route.params;
  const dateStart = event.startTime.split("T");
  const dateEnd = event.endTime.split("T");

  return (
    <ScrollView
      style={{
        ...styles.containerScroll,
        backgroundColor: theme.colors.background,
      }}
    >
      <View style={styles.container}>
        <Text style={styles.address} variant="bodyLarge">
          {event.address}
        </Text>
        <View style={styles.dataContainer}>
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
        </View>

        <View style={styles.containerButtons}>
          <Button
            mode="contained-tonal"
            onPress={() => {
              navigation.push("Расписание мероприятия");
            }}
          >
            Расписание
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              navigation.push("Заявка на участие");
            }}
          >
            Участвовать
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerScroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
  },
  address: {
    textAlign: "center",
  },
  dataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerButtons: {
    marginTop: 30,
    gap: 30,
  },
});

export default EventScreen;
