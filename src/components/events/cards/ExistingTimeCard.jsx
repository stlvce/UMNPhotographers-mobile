import { useState } from "react";
import { View } from "react-native";
import { Card, Text, Button, Portal, useTheme } from "react-native-paper";
import ActionConfirmDialog from "../../../modals/ActionConfirmDialog";

const ExistingTimeCard = ({ item, handleDelete }) => {
  const theme = useTheme();
  const dateStart = new Date(item.startTime);
  const dateEnd = new Date(item.endTime);
  const [isVisibleDialog, setIsVisibleDialog] = useState(false);

  const changeVisibleDialog = () => {
    setIsVisibleDialog(!isVisibleDialog);
  };

  return (
    <Card>
      <Card.Title title="Промежуток съемок" titleVariant="titleMedium" />
      <Card.Content style={{ paddingHorizontal: 15, gap: 20 }}>
        <View>
          <Text>Дата</Text>
          <Text>{dateStart.toLocaleDateString()}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 30,
          }}
        >
          <View>
            <Text>Время начала</Text>
            <Text>{dateStart.toLocaleTimeString()}</Text>
          </View>
          <View>
            <Text>Время окончания</Text>
            <Text>{dateEnd.toLocaleTimeString()}</Text>
          </View>
        </View>
        <Button
          mode="contained"
          buttonColor={theme.colors.error}
          onPress={changeVisibleDialog}
        >
          Удалить
        </Button>
        <Portal>
          <ActionConfirmDialog
            question={`Вы действительно хотите удалить время съемок с ${dateStart.toLocaleTimeString()} до ${dateEnd.toLocaleTimeString()}?`}
            visible={isVisibleDialog}
            changeVisible={changeVisibleDialog}
            handleSubmit={() => handleDelete(item.id)}
          />
        </Portal>
      </Card.Content>
    </Card>
  );
};

export default ExistingTimeCard;
