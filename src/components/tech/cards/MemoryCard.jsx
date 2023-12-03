import { Button, Card, List, useTheme } from "react-native-paper";
import { StyleSheet } from "react-native";

const MemoryCard = ({ item, deleteTech }) => {
  const theme = useTheme();

  return (
    <Card style={styles.card}>
      <Card.Title
        title={item.model.name}
        subtitle="Карта памяти"
        titleVariant="titleLarge"
      />
      <Card.Content>
        <List.Item title={`Производитель: ${item.manufacturer.name}`} />
        <List.Item title={`Объем: ${item.size}`} />
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

export default MemoryCard;
