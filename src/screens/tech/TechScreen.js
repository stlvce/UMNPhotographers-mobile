import { useState, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  Card,
  List,
  Text,
  Button,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import { useTechniqueInfoQuery } from "../../api/techApi";

const TechScreen = () => {
  const theme = useTheme();
  const [tech, setTech] = useState([]);
  const { data, isLoading, error } = useTechniqueInfoQuery();

  useEffect(() => {
    if (data) {
      setTech(data.technique);
    }
  }, [data]);

  return (
    <ScrollView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} size="large" />
      ) : tech.length === 0 ? (
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", marginTop: 20 }}
        >
          {error ? "Ошибка" : "Нет техники"}
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
