import { useState } from "react";
import { StyleSheet } from "react-native";
import { Menu, Button, Divider } from "react-native-paper";

const sortVariants = [
  {
    title: "По времени начала (по возрастанию)",
    sortFunc: "startTime,asc",
  },
  {
    title: "По времени начала (по убыванию)",
    sortFunc: "startTime,desc",
  },
  {
    title: "По названию (по возрастанию)",
    sortFunc: "name,asc",
  },
  {
    title: "По названию (по убыванию)",
    sortFunc: "name,desc",
  },
  {
    title: "По сложности (по возрастанию)",
    sortFunc: "level,asc",
  },
  {
    title: "По сложности (по убыванию)",
    sortFunc: "level,desc",
  },
];

const SortingMenu = ({ visible, changeVisible, initiateSort }) => {
  const [sortStatus, setSortStatus] = useState("");

  const chooseSortType = (type, sortVariant) => {
    initiateSort(sortVariant);
    setSortStatus(type);
    changeVisible();
  };

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
          icon="sort"
        >
          {Boolean(sortStatus) ? sortStatus : "Сортировать"}
        </Button>
      }
    >
      <Menu.Item
        onPress={() => chooseSortType("", null)}
        title="Сбросить сортировку"
        disabled={!Boolean(sortStatus)}
      />
      <Divider />
      {sortVariants.map((variant) => (
        <Menu.Item
          onPress={() => chooseSortType(variant.title, variant.sortFunc)}
          title={variant.title}
          disabled={variant.title === sortStatus}
          key={variant.title}
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
