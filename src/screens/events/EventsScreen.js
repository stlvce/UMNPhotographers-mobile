import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import SortingMenu from "../../components/events/SortingMenu";
import EventsList from "../../components/events/EventsList";

const EventsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [visibleMenu, setVisibleMenu] = useState(false);

  const changeVisibleMenu = () => {
    setVisibleMenu((prev) => !prev);
  };

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <SortingMenu visible={visibleMenu} changeVisible={changeVisibleMenu} />
      <EventsList navigation={navigation} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default EventsScreen;
