import { View, Image, StyleSheet, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";

const EventScreen = ({ route, navigation }) => {
  const event = route.params;
  return (
    <ScrollView style={styles.containerScroll}>
      <View style={styles.container}>
        <View style={styles.containerImage}>
          <Image source={event.imgSrc} style={styles.img} />
        </View>
        <Text variant="bodyLarge">{event.description}</Text>
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
    backgroundColor: "#FFF",
  },
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
  },
  img: { height: 300, width: 300 },
  description: {
    width: 300,
  },
  containerImage: {
    alignItems: "center",
  },
  containerButtons: {
    gap: 30,
  },
});

export default EventScreen;
