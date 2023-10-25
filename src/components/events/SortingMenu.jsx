import { useState } from "react";
import { StyleSheet } from "react-native";
import { Menu, Button, Divider } from "react-native-paper";

const sortVariants = [
  {
    title: "По времени начала",
    sortFunc: null,
  },
  {
    title: "По названию",
    sortFunc: null,
  },
  {
    title: "По сложности (приоритету)",
    sortFunc: null,
  },
];

const SortingMenu = ({ visible, changeVisible }) => {
  const [sortStatus, setSortStatus] = useState("");

  return (
    <Menu
      visible={visible}
      onDismiss={changeVisible}
      anchor={
        <Button
          style={styles.button}
          onPress={changeVisible}
          mode="contained-tonal"
          icon="sort"
        >
          {Boolean(sortStatus) ? sortStatus : "Сортировать"}
        </Button>
      }
    >
      <Menu.Item
        onPress={() => {
          setSortStatus("");
          changeVisible();
        }}
        title="Сбросить сортировку"
        disabled={!Boolean(sortStatus)}
      />
      <Divider />
      {sortVariants.map((variant) => (
        <Menu.Item
          onPress={() => {
            setSortStatus(variant.title);
            changeVisible();
          }}
          title={variant.title}
          key={variant.title}
          disabled={variant.title === sortStatus}
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

export default SortingMenu;
