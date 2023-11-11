import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, List, Text, Button, useTheme } from "react-native-paper";
import { useTechniqueInfoQuery } from "../../api/techApi";

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

const TechScreen = ({ navigation }) => {
  const theme = useTheme();
  const { data } = useTechniqueInfoQuery();
  const [tech, setTech] = useState(items);

  return (
    <ScrollView style={styles.container}>
      {tech.length === 0 ? (
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", marginTop: 20 }}
        >
          Нет техники
        </Text>
      ) : (
        tech.map((item) => (
          <Card style={styles.card} key={item.id}>
            <Card.Title title={item.type} titleVariant="titleLarge" />
            <Card.Content>
              {Object.entries(item).map(([key, value]) => (
                <List.Item
                  title={<Text variant="bodyLarge">{`${key}: ${value}`}</Text>}
                  key={key}
                />
              ))}
            </Card.Content>
            <Card.Actions>
              <Button
                icon="delete"
                mode="contained"
                buttonColor={theme.colors.error}
                onPress={() => {
                  setTech([...tech.filter((el) => el.id !== item.id)]);
                }}
              >
                Удалить
              </Button>
            </Card.Actions>
          </Card>
        ))
      )}
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
