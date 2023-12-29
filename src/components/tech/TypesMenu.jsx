import { StyleSheet } from "react-native";
import { Menu, Button, Divider } from "react-native-paper";

const typeVariants = [
  { title: "Камера", icon: "camera-outline" },
  { title: "Аккумулятор", icon: "battery-high" },
  { title: "Вспышка", icon: "flash-outline" },
  { title: "Оптика", icon: "dots-circle" },
  { title: "Карта памяти", icon: "memory" },
];

const TypesMenu = ({ visible, changeVisible, selectedType, chooseType }) => {
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
