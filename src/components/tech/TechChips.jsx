import { Chip } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const TechChips = ({ userTechInfo, technique, handleUpdateTechList }) => {
  return (
    <View style={styles.container}>
      {new Set(userTechInfo.technique.map((el) => el.type)).size > 1 &&
        Array.from(
          new Set(userTechInfo.technique.map((item) => item.type)),
        ).map((type) => (
          <Chip
            selected={
              new Set(technique.map((el) => el.type)).size === 1 &&
              new Set(technique.map((el) => el.type)).has(type)
            }
            onPress={() => {
              if (
                new Set(userTechInfo.technique.map((el) => el.type)).size <= 1
              ) {
                return;
              }

              const techTypesSet = new Set(technique.map((el) => el.type));

              if (techTypesSet.size === 1 && techTypesSet.has(type)) {
                handleUpdateTechList(userTechInfo.technique);
              } else {
                handleUpdateTechList(
                  userTechInfo.technique.filter((el) => el.type === type),
                );
              }
            }}
            key={type}
          >
            {type}
          </Chip>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});

export default TechChips;
