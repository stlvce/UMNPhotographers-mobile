import { ScrollView, StyleSheet } from "react-native";
import { Card, List, Text, Button, useTheme } from "react-native-paper";
import iconPng from "../../assets/icon.png";

const items = [
  {
    id: 0,
    manufacturerId: 0,
    modelId: 0,
    rating: 0,
    type: "camera",
    crop: "string",
  },
  {
    id: 1,
    manufacturerId: 0,
    modelId: 0,
    rating: 0,
    type: "camera",
    crop: "string",
  },
  {
    id: 2,
    manufacturerId: 0,
    modelId: 0,
    rating: 0,
    type: "camera",
    crop: "string",
  },
  {
    id: 3,
    manufacturerId: 0,
    modelId: 0,
    rating: 0,
    type: "camera",
    crop: "string",
  },
];

const TechScreen = () => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      {items.map((item) => (
        <Card style={styles.card} key={item.id}>
          <Card.Cover source={iconPng} />
          <Card.Title title={"Камера " + item.id} titleVariant="titleLarge" />
          <Card.Content>
            {Object.entries(item).map(([key, value]) => (
              <List.Item
                title={<Text variant="bodyLarge">{`${key}: ${value}`}</Text>}
                left={() => <List.Icon icon="cog" />}
                key={key}
              />
            ))}
          </Card.Content>
          <Card.Actions>
            <Button
              icon="delete"
              mode="contained"
              buttonColor={theme.colors.error}
            >
              Удалить
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "#FFF",
  },
  card: {
    marginBottom: 20,
  },
});

export default TechScreen;
