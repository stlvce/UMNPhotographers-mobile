import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useTheme, Button, Text, IconButton } from "react-native-paper";
import DateEventPicker from "../../components/events/DateEventPicker";
import TimeEventPicker from "../../components/events/TimeEventPicker";
import {
  useUpsertFreeTimeMutation,
  useReceiveActivitiesDatesEventQuery,
} from "../../api/eventApi";
import Loader from "../../components/ui/Loader";
import StateScreen from "../../components/ui/StateScreen";

const AddTimeScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const eventId = route.params;

  const [formData, setFormData] = useState({
    startTime: { hours: null, minutes: null },
    endTime: { hours: null, minutes: null },
  });
  const [handleUpsert] = useUpsertFreeTimeMutation();

  const { data: datesList, isLoading } =
    useReceiveActivitiesDatesEventQuery(eventId);
  const [indexActiveDate, setIndexActiveDate] = useState(0);
  const activeDate = datesList && new Date(datesList[indexActiveDate]);

  const handleChange = (varName, newValue) => {
    setFormData({ ...formData, [varName]: newValue });
  };

  const handleSubmit = () => {
    const startTime = new Date(datesList[indexActiveDate]);
    startTime.setHours(formData.startTime.hours);
    startTime.setMinutes(formData.startTime.minutes);
    startTime.setSeconds(0);

    const endTime = new Date(datesList[indexActiveDate]);
    endTime.setHours(formData.endTime.hours);
    endTime.setMinutes(formData.endTime.minutes);
    endTime.setSeconds(0);

    handleUpsert([
      eventId,
      {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      },
    ]);
    navigation.goBack();
  };

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

  if (datesList.length === 0) {
    return (
      <StateScreen message="На мероприятие пока не добавлены активности" />
    );
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
      <View style={{ gap: 15, marginTop: 30 }}>
        <Text variant="titleMedium">Промежуток времени</Text>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <TimeEventPicker
            label="Начало"
            varName="startTime"
            value={formData.startTime}
            handler={handleChange}
          />
          <TimeEventPicker
            label="Конец"
            varName="endTime"
            value={formData.endTime}
            handler={handleChange}
          />
        </View>
      </View>
      <Button
        style={{ marginTop: 60 }}
        mode="contained"
        onPress={handleSubmit}
        disabled={!formData.startTime.hours || !formData.endTime.hours}
        contentStyle={{ height: 45 }}
      >
        Сохранить
      </Button>
    </ScrollView>
  );
};

export default AddTimeScreen;
