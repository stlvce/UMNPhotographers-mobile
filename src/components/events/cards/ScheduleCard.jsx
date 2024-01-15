import { Card, Text } from "react-native-paper";
import { View } from "react-native";
import {
  useReceiveActivityByIdQuery,
  useReceiveLocationByIdQuery,
  useReceiveZoneByIdQuery,
} from "../../../api/eventApi";
import Loader from "../../ui/Loader";

const ScheduleCard = ({ scheduleItem }) => {
  const { data: activity, isLoading: isActivityLoading } =
    useReceiveActivityByIdQuery(scheduleItem.activityId);
  const { data: location, isLoading: isLocationLoading } =
    useReceiveLocationByIdQuery(activity?.locationId, {
      skip: !activity?.locationId,
    });
  const { data: zone, isLoading: isZoneLoading } = useReceiveZoneByIdQuery(
    activity?.zoneId,
    {
      skip: !activity?.zoneId,
    },
  );

  return (
    <Card>
      <Card.Title title={activity?.name} subtitle={location?.name} />
      <Card.Content style={{ gap: 10, marginTop: 15 }}>
        <View>
          <Text style={{ opacity: 0.7 }} variant="bodyMedium">
            Зона №
          </Text>
          <Text variant="bodyMedium">{zone?.number}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ opacity: 0.7 }} variant="bodyMedium">
              С
            </Text>
            <Text variant="bodyMedium">
              {new Date(scheduleItem.startTime).toLocaleString()}
            </Text>
          </View>
          <View>
            <Text style={{ opacity: 0.7 }} variant="bodyMedium">
              До
            </Text>
            <Text variant="bodyMedium">
              {new Date(scheduleItem.endTime).toLocaleString()}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ScheduleCard;
