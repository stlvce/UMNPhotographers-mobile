import { View, Text, StyleSheet } from "react-native";

const TimetableScreen = () => {
  return (
    <View style={styles.container}>
      <Text>РАСПИСАНИЕ МЕРОПРИЯТИЯ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default TimetableScreen;
