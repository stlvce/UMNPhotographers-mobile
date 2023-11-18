import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import TypesMenu from "../../components/tech/TypesMenu";
import FormReturner from "../../components/tech/FormReturner";

const AddTechScreen = () => {
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [selectedType, setSelectedType] = useState({
    title: "Выбрать тип техники",
    icon: "",
  });

  const changeVisibleMenu = () => {
    setVisibleMenu((prev) => !prev);
  };

  const resetType = () => {
    setSelectedType({
      title: "Выбрать тип техники",
      icon: "",
    });
    changeVisibleMenu();
  };

  const chooseType = (type) => {
    setSelectedType(type);
    changeVisibleMenu();
  };

  return (
    <ScrollView style={styles.container}>
      <TypesMenu
        visible={visibleMenu}
        changeVisible={changeVisibleMenu}
        selectedType={selectedType}
        resetType={resetType}
        chooseType={chooseType}
      />
      {selectedType.title !== "Выбрать тип техники" && (
        <FormReturner type={selectedType.title} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    gap: 20,
  },
});

export default AddTechScreen;