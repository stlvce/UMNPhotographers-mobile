import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import { useReceiveEventListQuery } from "../../api/eventApi";
import Loader from "../ui/Loader";
import { useEffect } from "react";
import { useAuthLogoutMutation } from "../../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EventsList = ({ navigation }) => {
  const { data, isLoading, isError, error } = useReceiveEventListQuery();
  const [handleLogout] = useAuthLogoutMutation();

  const removeSessionID = async () => {
    await AsyncStorage.removeItem("SESSION");
  };

  // TODO: убрать это и переделать выход при истечении сессии
  useEffect(() => {
    if (isError) {
      console.log(error);
      removeSessionID();
      handleLogout();
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        data?.list?.map((event) => (
          <Card
            style={styles.card}
            key={event.name}
            onPress={() => navigation.navigate("Мероприятие", event)}
          >
            <Card.Title title={event.name} subtitle={event.address} />
            <Card.Content>
              <Text variant="bodyMedium">Начало: {event.startTime}</Text>
              <Text variant="bodyMedium">Конец: {event.endTime}</Text>
            </Card.Content>
          </Card>
        ))
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
});

export default EventsList;
