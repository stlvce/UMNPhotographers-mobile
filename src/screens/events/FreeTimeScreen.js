import { ScrollView, View } from "react-native";
import { useTheme, Button, Portal } from "react-native-paper";
import {
  useReceiveFreeTimeQuery,
  useDeleteFreeTimeMutation,
} from "../../api/eventApi";
import Loader from "../../components/ui/Loader";
import ExistingTimeCard from "../../components/events/cards/ExistingTimeCard";
import StatusSnackbar from "../../components/ui/StatusSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { closeStatusUpsertFreeTime } from "../../store/slices/eventSlice";

const FreeTimeScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const eventId = route.params;
  const dispatch = useDispatch();
  const statusUpsertFreeTime = useSelector(
    (state) => state.event.statusUpsertFreeTime,
  );
  const { data, isLoading } = useReceiveFreeTimeQuery(eventId);
  const [handleDeleteFreeTime] = useDeleteFreeTimeMutation();

  const handleDelete = (freeTimeId) => {
    handleDeleteFreeTime([eventId, freeTimeId]);
  };

  const closeSnackbar = () => {
    dispatch(closeStatusUpsertFreeTime());
  };

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background, padding: 15 }}
    >
      <View style={{ gap: 30 }}>
        <Button
          icon="plus"
          onPress={() => {
            navigation.push("Добавление промежутка", eventId);
          }}
          contentStyle={{ height: 45 }}
        >
          Добавить промежуток
        </Button>

        <View style={{ gap: 15, marginBottom: 40 }}>
          {data?.map((item) => (
            <ExistingTimeCard
              item={item}
              handleDelete={handleDelete}
              key={item.id}
            />
          ))}
        </View>
      </View>
      <Portal>
        <StatusSnackbar
          isVisible={statusUpsertFreeTime.isVisible}
          message="Время добавлено"
          errorMessage={statusUpsertFreeTime.errorMessage}
          closeSnackbar={closeSnackbar}
        />
      </Portal>
    </ScrollView>
  );
};

export default FreeTimeScreen;
