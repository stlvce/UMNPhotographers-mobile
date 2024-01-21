import { Button, Card, Portal, Text, useTheme } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import ActionConfirmDialog from "../../modals/ActionConfirmDialog";
import { useState } from "react";

const TechCard = ({ tech, nameType, additionalInfo, deleteTech }) => {
  const theme = useTheme();
  const [isVisibleDialog, setIsVisibleDialog] = useState(false);

  const changeVisibleDialog = () => {
    setIsVisibleDialog(!isVisibleDialog);
  };

  const handleDelete = () => {
    deleteTech(tech);
  };

  return (
    <Card
      style={{ ...styles.card, backgroundColor: theme.colors.cardBackground }}
    >
      <Card.Title
        title={tech.model.name}
        titleVariant="titleMedium"
        subtitle={nameType}
      />
      <Card.Content style={styles.contentContainer}>
        <View>
          <Text style={styles.propertyTitle} variant="bodyMedium">
            Производитель
          </Text>
          <Text variant="bodyMedium">{tech.manufacturer.name}</Text>
        </View>
        {additionalInfo?.map((item) => (
          <View key={item.title}>
            <Text style={styles.propertyTitle} variant="bodyMedium">
              {item.title}
            </Text>
            <Text variant="bodyMedium">{item.value}</Text>
          </View>
        ))}
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
            question={`Вы действительно хотите удалить камеру ${tech.model.name} производителя ${tech.manufacturer.name}?`}
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
  card: {
    shadowOpacity: 0.1,
  },
  contentContainer: { marginTop: 10, gap: 15 },
  progressBarContainer: {
    gap: 7,
  },
  levelCount: {
    alignSelf: "flex-end",
  },
  propertyTitle: {
    opacity: 0.7,
  },
});

export default TechCard;
