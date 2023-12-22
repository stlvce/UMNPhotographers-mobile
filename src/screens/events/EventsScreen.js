import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useTheme } from "react-native-paper";
import SortingMenu from "../../components/events/SortingMenu";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import EventsList from "../../components/events/EventsList";
import { useReceiveEventListQuery } from "../../api/eventApi";

const EventsScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [visibleMenu, setVisibleMenu] = useState(false);
  const { data, isLoading, isError, refetch } = useReceiveEventListQuery();

  const changeVisibleMenu = () => {
    setVisibleMenu((prev) => !prev);
  };

  useEffect(() => {
    if (isError) {
      dispatch(logout());
      navigation.replace("Вход");
    }
  }, [isError]);

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <SortingMenu visible={visibleMenu} changeVisible={changeVisibleMenu} />
      {!isLoading && (
        <EventsList navigation={navigation} data={data} isError={isError} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default EventsScreen;
