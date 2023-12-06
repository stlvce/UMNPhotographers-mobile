import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import TypesMenu from "../../components/tech/TypesMenu";
import FormReturner from "../../components/tech/FormReturner";

const AddTechScreen = ({ navigation }) => {
  const theme = useTheme();
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [selectedType, setSelectedType] = useState({
    title: "Выбрать тип техники",
    icon: "",
  });

  const changeVisibleMenu = () => {
    setVisibleMenu((prev) => !prev);
  };

  const chooseType = (type) => {
    setSelectedType(type);
    changeVisibleMenu();
  };

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <TypesMenu
        visible={visibleMenu}
        changeVisible={changeVisibleMenu}
        selectedType={selectedType}
        chooseType={chooseType}
      />
      {selectedType.title !== "Выбрать тип техники" && (
        <FormReturner type={selectedType.title} navigation={navigation} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 5,
    gap: 20,
    flex: 1,
  },
});

export default AddTechScreen;
