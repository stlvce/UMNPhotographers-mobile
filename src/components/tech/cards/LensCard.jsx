import { Button, Card, List, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

const LensCard = ({ item, deleteTech }) => {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Title
        title={item.model.name}
        subtitle="Оптика"
        titleVariant="titleLarge"
      />
      <Card.Content>
        <List.Item title={`Производитель: ${item.manufacturer.name}`} />
        <List.Item title={`Фокусное расстояние: ${item.focus}`} />
        <List.Item
          title={`Камера: ${item.camera?.model.name} (Кроп-фактор: ${item.camera?.crop})`}
        />
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

export default LensCard;
