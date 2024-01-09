import { useState } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useTheme } from "react-native-paper";
import SortingMenu from "../../components/events/SortingMenu";
import EventsList from "../../components/events/EventsList";
import {
  useReceiveEventListQuery,
  useReceiveUserEventListQuery,
} from "../../api/eventApi";

const EventsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [sortVariant, setSortVariant] = useState(null);
  const { data, isLoading, isError, refetch } =
    useReceiveEventListQuery(sortVariant);
  const { isLoading: isUserEventLoading } = useReceiveUserEventListQuery();

  const changeVisibleMenu = () => {
    setVisibleMenu((prev) => !prev);
  };

  const initiateSort = (newSortVariant) => {
    setSortVariant(newSortVariant);
  };

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
      refreshControl={
        <RefreshControl
          refreshing={isLoading || isUserEventLoading}
          onRefresh={refetch}
        />
      }
    >
      <SortingMenu
        visible={visibleMenu}
        changeVisible={changeVisibleMenu}
        initiateSort={initiateSort}
      />
      {!isLoading && !isUserEventLoading && (
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
