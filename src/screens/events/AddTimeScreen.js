import { useState } from "react";
import { ScrollView, View } from "react-native";
import { useTheme, Button, Text, Portal } from "react-native-paper";
import DateEventPicker from "../../components/events/DateEventPicker";
import TimeEventPicker from "../../components/events/TimeEventPicker";
import { useUpsertFreeTimeMutation } from "../../api/eventApi";

const AddTimeScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const eventId = route.params;

  const [formData, setFormData] = useState({
    date: null,
    startTime: { hours: null, minutes: null },
    endTime: { hours: null, minutes: null },
  });
  const [handleUpsert] = useUpsertFreeTimeMutation();

  const handleChange = (varName, newValue) => {
    setFormData({ ...formData, [varName]: newValue });
  };

  const handleSubmit = () => {
    const startTime = new Date(formData.date);
    startTime.setHours(formData.startTime.hours);
    startTime.setMinutes(formData.startTime.minutes);
    startTime.setSeconds(0);

    const endTime = new Date(formData.date);
    endTime.setHours(formData.endTime.hours);
    endTime.setMinutes(formData.endTime.minutes);
    endTime.setSeconds(0);

    handleUpsert([
      eventId,
      {
        startTime,
        endTime,
      },
    ]);
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
        padding: 15,
      }}
    >
      <View style={{ gap: 15 }}>
        <Text variant="titleMedium">Дата съемок</Text>
        <DateEventPicker
          varName="date"
          value={formData.date}
          handler={handleChange}
        />
      </View>

      <View style={{ gap: 15, marginTop: 30 }}>
        <Text variant="titleMedium">Время съемок</Text>
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
        disabled={
          !formData.date || !formData.startTime.hours || !formData.endTime.hours
        }
      >
        Сохранить
      </Button>
    </ScrollView>
  );
};

export default AddTimeScreen;
