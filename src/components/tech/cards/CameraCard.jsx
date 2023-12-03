import { Button, Card, List, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

const CameraCard = ({ item, deleteTech }) => {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Title
        title={item.model.name}
        subtitle="Камера"
        titleVariant="titleLarge"
      />
      <Card.Content>
        <List.Item title={`Производитель: ${item.manufacturer.name}`} />
        <List.Item title={`Кроп-фактор: ${item.crop}`} />
        <List.Item title={`Рейтинг: ${item.rating}`} />
      </Card.Content>
      <Card.Actions>
        <Button
          icon="delete"
          mode="contained"
          buttonColor={theme.colors.error}
          onPress={() => deleteTech(item)}
        >
          Удалить
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
});

export default CameraCard;
