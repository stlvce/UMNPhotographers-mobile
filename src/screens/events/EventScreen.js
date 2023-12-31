import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { useEventRegisterMutation } from "../../api/eventApi";
import LevelBar from "../../components/events/LevelBar";

const EventScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const event = route.params;
  const dateStart = event.startTime.split("T");
  const dateEnd = event.endTime.split("T");
  const [handleEventRegister] = useEventRegisterMutation();

  const handleRegister = () => {
    handleEventRegister(event.id)
      .unwrap()
      .then((res) => {
        console.log(res, "DATA");
        navigation.push("Заявка на участие");
      })
      .catch((err) => console.log(err, "ERROR"));
  };

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
        {event?.description && <Text>{event.description}</Text>}
        <LevelBar level={event.level} />
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
        {Boolean("") ? (
          <View style={styles.containerButtons}>
            <Button
              mode="contained-tonal"
              onPress={() => {
                navigation.push("Расписание мероприятия");
              }}
            >
              Расписание мероприятия
            </Button>
            <Button mode="contained" onPress={handleRegister}>
              Отправить заявку
            </Button>
          </View>
        ) : (
          <View style={styles.containerButtons}>
            <Button
              mode="contained"
              onPress={() => {
                navigation.push("Ваш календарь");
              }}
            >
              Мое расписание
            </Button>
            <View style={styles.containerDataButtons}>
              <Button
                mode="contained-tonal"
                onPress={() => {
                  navigation.navigate("Приоритеты", event.id);
                }}
              >
                Приоритете зон
              </Button>
              <Button
                mode="contained-tonal"
                onPress={() => {
                  navigation.navigate("Удобное время", event.id);
                }}
              >
                Время
              </Button>
            </View>
          </View>
        )}
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
  containerDataButtons: {
    gap: 15,
  },
});

export default EventScreen;
