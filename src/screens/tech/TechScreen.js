import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import { Text, Portal } from "react-native-paper";
import { useReceiveUserTechListQuery } from "../../api/techApi";
import { useSelector, useDispatch } from "react-redux";
import { removeTech } from "../../store/slices/techSlice";
import StatusSnackbar from "../../components/ui/StatusSnackbar";
import { closeStatusAddTech } from "../../store/slices/techSlice";
import TechCardReturner from "../../components/tech/TechCardReturner";

const TechScreen = () => {
  const dispatch = useDispatch();
  const userTechInfo = useSelector((state) => state.tech.userTechInfo);
  const statusAddTech = useSelector((state) => state.tech.statusAddTech);
  const [technique, setTechnique] = useState([]);
  const { data, isLoading, error, refetch } = useReceiveUserTechListQuery();

  const deleteTech = (item) => {
    setTechnique([...technique.filter((el) => el.id !== item.id)]);
    dispatch(removeTech(item));
  };

  const closeSnackbar = () => {
    dispatch(closeStatusAddTech());
  };

  useEffect(() => {
    if (data) {
      setTechnique(userTechInfo.technique);
    }
  }, [userTechInfo]);

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      {technique?.length === 0 ? (
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", marginTop: 20 }}
        >
          {error ? "Ошибка" : "Нет техники"}
        </Text>
      ) : (
        <>
          {technique.map((item) => (
            <TechCardReturner
              item={item}
              deleteTech={deleteTech}
              key={item.id}
            />
          ))}
        </>
      )}
      <Portal>
        <StatusSnackbar
          isVisible={statusAddTech.isVisible}
          message="Техника успешно добавлена"
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
