import { useState } from "react";
import { View } from "react-native";
import { Card, Text, Button, Portal, useTheme } from "react-native-paper";
import ActionConfirmDialog from "../../../modals/ActionConfirmDialog";

const ExistingTimeCard = ({ item, handleDelete }) => {
  const theme = useTheme();
  const gmtPlus = new Date().toString().slice(-3, -2);
  const dateStart = new Date(item.startTime);
  dateStart.setHours(Number(dateStart.getHours()) + Number(gmtPlus));
  const dateEnd = new Date(item.endTime);
  dateEnd.setHours(Number(dateEnd.getHours()) + Number(gmtPlus));
  const [isVisibleDialog, setIsVisibleDialog] = useState(false);

  const changeVisibleDialog = () => {
    setIsVisibleDialog(!isVisibleDialog);
  };

  return (
    <Card>
      <Card.Title title="Время на съемку" titleVariant="titleMedium" />
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
            <Text>Начало</Text>
            <Text>
              {dateStart.toLocaleTimeString([], { timeStyle: "short" })}
            </Text>
          </View>
          <View>
            <Text>Окончание</Text>
            <Text>
              {dateEnd.toLocaleTimeString([], { timeStyle: "short" })}
            </Text>
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
