import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { Card, List, Text, Button, useTheme, Portal } from "react-native-paper";
import { useReceiveUserTechListQuery } from "../../api/techApi";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/ui/Loader";
import { removeTech } from "../../store/slices/techSlice";
import StatusSnackbar from "../../components/ui/StatusSnackbar";
import { closeStatusAddTech } from "../../store/slices/techSlice";

const TechScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userTechInfo = useSelector((state) => state.tech.userTechInfo);
  const statusAddTech = useSelector((state) => state.tech.statusAddTech);
  const [tech, setTech] = useState([]);
  const { data, isLoading, error, refetch } = useReceiveUserTechListQuery();

  const deleteTech = (item) => {
    setTech([...tech.filter((el) => el.id !== item.id)]);
    dispatch(removeTech(item));
  };

  const closeSnackbar = () => {
    dispatch(closeStatusAddTech());
  };

  // TODO: убрать состояние из компонента
  useEffect(() => {
    if (data) {
      setTech(userTechInfo.technique);
    }
  }, [userTechInfo]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      {/*isLoading ? (<Loader />) :*/}
      {tech?.length === 0 ? (
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
                  title={
                    <Text variant="bodyLarge">{`${key}: ${
                      key === "model" || key === "manufacturer"
                        ? value?.name
                        : value
                    }`}</Text>
                  }
                  key={key}
                />
              ))}
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
        ))
      )}
      <Portal>
        <StatusSnackbar
          isVisible={statusAddTech.isVisible}
          message={"Техника успешно добавлена"}
          errorMessage={statusAddTech.errorMessage}
          closeSnackbar={closeSnackbar}
        />
      </Portal>
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
