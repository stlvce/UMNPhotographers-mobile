import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import SortingMenu from "../../components/events/SortingMenu";
import EventsList from "../../components/events/EventsList";

const EventsScreen = ({ navigation }) => {
  const [visibleMenu, setVisibleMenu] = useState(false);

  const changeVisibleMenu = () => {
    setVisibleMenu((prev) => !prev);
  };

  return (
    <ScrollView style={styles.container}>
      <SortingMenu visible={visibleMenu} changeVisible={changeVisibleMenu} />
      <EventsList navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#FFF",
  },
});

export default EventsScreen;
