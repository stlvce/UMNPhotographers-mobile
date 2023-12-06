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
        <List.Item
          title={`Производитель: ${item.manufacturer.name}`}
          titleStyle={{ fontSize: 15 }}
        />
        <List.Item
          title={`Объем: ${item.size}`}
          titleStyle={{ fontSize: 15 }}
        />
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
  card: {},
});

export default MemoryCard;
