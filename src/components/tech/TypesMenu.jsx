import { StyleSheet } from "react-native";
import { Menu, Button, Divider } from "react-native-paper";

const typeVariants = [
  { title: "Камера", icon: "camera-outline" },
  { title: "Батарея", icon: "battery-high" },
  { title: "Вспышка", icon: "flash-outline" },
  { title: "Линзы", icon: "circle-outline" },
  { title: "Карта памяти", icon: "memory" },
];

const TypesMenu = ({
  visible,
  changeVisible,
  selectedType,
  resetType,
  chooseType,
}) => {
  return (
    <Menu
      visible={visible}
      onDismiss={changeVisible}
      anchorPosition="bottom"
      anchor={
        <Button
          style={styles.button}
          onPress={changeVisible}
          mode="contained-tonal"
          icon={selectedType.icon}
        >
          {selectedType.title}
        </Button>
      }
    >
      <Menu.Item
        onPress={resetType}
        title="Сбросить тип"
        disabled={!Boolean(selectedType)}
      />
      <Divider />
      {typeVariants.map((type) => (
        <Menu.Item
          onPress={() => chooseType(type)}
          title={type.title}
          leadingIcon={type.icon}
          disabled={type.title === selectedType}
          key={type.title}
        />
      ))}
    </Menu>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
  },
});

export default TypesMenu;
