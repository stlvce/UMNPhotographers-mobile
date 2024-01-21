import { useState } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useTheme, Searchbar, Icon } from "react-native-paper";
import SortingMenu from "../../components/events/SortingMenu";
import EventsList from "../../components/events/EventsList";
import {
  useReceiveEventListQuery,
  useReceiveUserEventListQuery,
} from "../../api/eventApi";

const EventsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
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
      <Searchbar
        style={{
          ...styles.searchBar,
          backgroundColor: theme.colors.searchBackground,
        }}
        placeholder="Поиск"
        onChangeText={setSearchQuery}
        value={searchQuery}
        clearIcon={() =>
          Boolean(searchQuery) && <Icon size={20} source="close" />
        }
        onClearIconPress={() => setSearchQuery("")}
      />
      <SortingMenu
        visible={visibleMenu}
        changeVisible={changeVisibleMenu}
        initiateSort={initiateSort}
      />
      {!isLoading && !isUserEventLoading && (
        <EventsList
          navigation={navigation}
          data={data}
          isError={isError}
          searchQuery={searchQuery}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchBar: { marginBottom: 40 },
  container: {
    padding: 15,
  },
});

export default EventsScreen;
