import { useState, useEffect } from "react";
import { ScrollView, StyleSheet, RefreshControl, View } from "react-native";
import { Text, Portal, useTheme } from "react-native-paper";
import { useReceiveUserTechListQuery } from "../../api/techApi";
import { useSelector, useDispatch } from "react-redux";
import { removeTech } from "../../store/slices/techSlice";
import StatusSnackbar from "../../components/ui/StatusSnackbar";
import { closeStatusAddTech } from "../../store/slices/techSlice";
import TechCardReturner from "../../components/tech/TechCardReturner";
import TechChips from "../../components/tech/TechChips";
import StateScreen from "../../components/ui/StateScreen";

const TechScreen = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userTechInfo = useSelector((state) => state.tech.userTechInfo);
  const statusAddTech = useSelector((state) => state.tech.statusAddTech);
  const [technique, setTechnique] = useState([]);
  const { data, isLoading, isError, refetch } = useReceiveUserTechListQuery();

  const deleteTech = (item) => {
    setTechnique([...technique.filter((el) => el.id !== item.id)]);
    dispatch(removeTech(item));
  };

  const closeSnackbar = () => {
    dispatch(closeStatusAddTech());
  };

  const handleUpdateTechList = (newList) => {
    setTechnique(newList);
  };

  useEffect(() => {
    if (data) {
      setTechnique(userTechInfo.technique);
    }
  }, [userTechInfo]);

  if (technique?.length === 0 && !isLoading) {
    return <StateScreen message="Техника не добавлена" isError={isError} />;
  }

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <View style={styles.techList}>
        <TechChips
          userTechInfo={userTechInfo}
          technique={technique}
          handleUpdateTechList={handleUpdateTechList}
        />
        <Text variant="bodyMedium" style={styles.textState}>
          Количество техники: {technique.length}
        </Text>
        {technique?.map((item) => (
          <TechCardReturner item={item} deleteTech={deleteTech} key={item.id} />
        ))}
      </View>
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
  },
  techList: {
    gap: 20,
    marginBottom: 30,
  },
  textState: {
    textAlign: "center",
    opacity: 0.7,
  },
});

export default TechScreen;
