import { View, Image, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

const EventScreen = ({ route, navigation }) => {
  const event = route.params;
  return (
    <View style={styles.container}>
      <Image source={event.imgSrc} style={styles.img} />
      <Text variant="bodyLarge">{event.description}</Text>
      <View style={styles.containerButtons}>
        <Button
          mode="elevated"
          onPress={() => {
            navigation.push("Заявка на участие");
          }}
        >
          Участвовать
        </Button>
        <Button
          mode="elevated"
          onPress={() => {
            navigation.push("Расписание мероприятия");
          }}
        >
          Расписание
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    gap: 20,
    padding: 20,
    backgroundColor: "#FFF",
  },
  img: { height: 300, width: 300 },
  description: {
    width: 300,
  },
  containerButtons: {
    flexDirection: "row",
    gap: 10,
  },
});

export default EventScreen;
