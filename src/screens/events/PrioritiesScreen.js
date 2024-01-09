import { useState, useEffect } from "react";
import { ScrollView, View } from "react-native";
import { useTheme, SegmentedButtons, Button, Text } from "react-native-paper";
import {
  useReceiveZonePriorityUserQuery,
  useReceiveZonesEventQuery,
  useSavePriorityMutation,
} from "../../api/eventApi";
import Loader from "../../components/ui/Loader";
import StateScreen from "../../components/ui/StateScreen";

const PrioritiesScreen = ({ route, navigation }) => {
  const [value, setValue] = useState([]);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const theme = useTheme();
  const eventId = route.params;
  const {
    data: priorityUser,
    isLoading: isLoadingUser,
    refetch,
  } = useReceiveZonePriorityUserQuery(eventId);
  const { data: zonesEvent, isLoading: isLoadingEvent } =
    useReceiveZonesEventQuery(eventId);
  const [handleSave] = useSavePriorityMutation();

  useEffect(() => {
    if (priorityUser?.length > 0) {
      setValue([
        ...priorityUser
          .map((item) => ({
            zoneId: item.zoneId,
            priority: item.priority,
            id: item.id,
          }))
          .sort((a, b) => a.zoneId - b.zoneId),
      ]);

      return;
    }

    if (zonesEvent) {
      setValue([
        ...zonesEvent.list.map((item) => ({ zoneId: item.id, priority: null })),
      ]);
    }
  }, [zonesEvent, priorityUser]);

  if (isLoadingEvent || isLoadingUser || isLoadingSave) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <Loader />
      </View>
    );
  }

  if (zonesEvent?.list.length === 0) {
    return <StateScreen message="Зоны ещё не добавлены" />;
  }

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background, padding: 15 }}
    >
      <View style={{ gap: 30 }}>
        {value.map((zone) => (
          <View key={zone.zoneId}>
            <Text variant="titleMedium">Зона {zone.zoneId}</Text>
            {Boolean(zone.description) && <Text>{zone.description}</Text>}
            <SegmentedButtons
              style={{ marginTop: 15 }}
              value={zone.priority}
              onValueChange={(e) => {
                setValue([
                  ...value.map((item) => {
                    if (item?.zoneId === zone?.zoneId) {
                      return { ...item, priority: e };
                    }

                    return item;
                  }),
                ]);
              }}
              buttons={[
                {
                  value: 1,
                  label: "Не хочу",
                },
                {
                  value: 2,
                  label: "Могу",
                },
                { value: 3, label: "Хочу" },
              ]}
            />
          </View>
        ))}
        <Button
          style={{ marginTop: 30 }}
          mode="contained"
          disabled={value.map((item) => item.priority).includes(null)}
          onPress={() => {
            setIsLoadingSave(true);
            Promise.all(
              value.map((item) => handleSave([eventId, item]).unwrap()),
            )
              .then(() => {
                return refetch().unwrap();
              })
              .then(() => {
                navigation.goBack();
              })
              .catch((err) => {
                setIsLoadingSave(false);
                console.log(err);
              });
          }}
          contentStyle={{ height: 45 }}
        >
          Сохранить
        </Button>
      </View>
    </ScrollView>
  );
};

export default PrioritiesScreen;
