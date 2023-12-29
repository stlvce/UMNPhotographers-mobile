import { useState } from "react";
import { Button, Card, List, Portal, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import ActionConfirmDialog from "../../../modals/ActionConfirmDialog";

const BatteryCard = ({ item, deleteTech }) => {
  const theme = useTheme();
  const userTechInfo = useSelector((state) => state.tech.userTechInfo);
  const [isVisibleDialog, setIsVisibleDialog] = useState(false);

  const changeVisibleDialog = () => {
    setIsVisibleDialog(!isVisibleDialog);
  };

  const handleDelete = () => {
    deleteTech(item);
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={item.model.name}
        subtitle="Аккумулятор"
        titleVariant="titleLarge"
      />
      <Card.Content>
        <List.Item
          title={`Производитель: ${item.manufacturer.name}`}
          titleStyle={{ fontSize: 15 }}
        />
        <List.Item
          title={`Количество: ${userTechInfo.batteryCount}`}
          titleStyle={{ fontSize: 15 }}
        />
      </Card.Content>
      <Card.Actions>
        <Button
          icon="delete"
          mode="contained"
          buttonColor={theme.colors.error}
          onPress={changeVisibleDialog}
        >
          Удалить
        </Button>
        <Portal>
          <ActionConfirmDialog
            question={`Вы действительно хотите удалить аккумулятор ${item.model.name} производителя ${item.manufacturer.name}?`}
            visible={isVisibleDialog}
            changeVisible={changeVisibleDialog}
            handleSubmit={handleDelete}
          />
        </Portal>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {},
});

export default BatteryCard;
