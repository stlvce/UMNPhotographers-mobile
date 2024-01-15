import { useState } from "react";
import { IconButton, Text, useTheme, Card } from "react-native-paper";
import { ScrollView, View } from "react-native";
import ScheduleCard from "../../components/events/cards/ScheduleCard";
import { useReceiveScheduleQuery } from "../../api/eventApi";
import Loader from "../../components/ui/Loader";
import StateScreen from "../../components/ui/StateScreen";

const schedule = [
  {
    id: 0,
    activityId: 37,
    startTime: "2024-01-15T20:47:27.133Z",
    endTime: "2024-01-15T20:47:27.133Z",
  },
  {
    id: 1,
    activityId: 20,
    startTime: "2024-01-16T20:47:27.133Z",
    endTime: "2024-01-16T20:47:27.133Z",
  },
  {
    id: 2,
    activityId: 24,
    startTime: "2024-01-24T20:47:27.133Z",
    endTime: "2024-01-24T20:47:27.133Z",
  },
  {
    id: 3,
    activityId: 43,
    startTime: "2024-02-01T20:47:27.133Z",
    endTime: "2024-02-01T20:47:27.133Z",
  },
  {
    id: 4,
    activityId: 44,
    startTime: "2024-02-01T20:47:27.133Z",
    endTime: "2024-02-01T20:47:27.133Z",
  },
  {
    id: 5,
    activityId: 15,
    startTime: "2024-02-01T20:47:27.133Z",
    endTime: "2024-02-01T20:47:27.133Z",
  },
];

// TODO: loader использовать при переключении или useTransition на родителе

const YourCalendarScreen = ({ route }) => {
  const theme = useTheme();
  const eventId = route.params;

  const { data, isLoading } = useReceiveScheduleQuery(eventId);
  const [indexActiveDate, setIndexActiveDate] = useState(0);
  const datesList =
    !isLoading &&
    Array.from(new Set(data.map((item) => item.startTime.split("T")[0])));
  const activeDate = !isLoading && new Date(datesList[indexActiveDate]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
          justifyContent: "center",
        }}
      >
        <Loader />
      </View>
    );
  }

  if (data.length === 0) {
    return <StateScreen message="Ваше расписание пока ещё не готово" />;
  }

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
        padding: 15,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          icon="arrow-left"
          mode="contained"
          onPress={() => setIndexActiveDate((prev) => --prev)}
          disabled={indexActiveDate === 0}
        />
        <Text variant="bodyLarge">{activeDate.toLocaleDateString()}</Text>
        <IconButton
          icon="arrow-right"
          mode="contained"
          onPress={() => setIndexActiveDate((prev) => ++prev)}
          disabled={indexActiveDate === datesList.length - 1}
        />
      </View>
      <View style={{ marginTop: 15, gap: 20 }}>
        {schedule
          .filter(
            (item) =>
              new Date(item.startTime).toLocaleDateString() ===
              activeDate.toLocaleDateString(),
          )
          .map((item) => (
            <ScheduleCard scheduleItem={item} key={item.id} />
          ))}
      </View>
    </ScrollView>
  );
};

export default YourCalendarScreen;
