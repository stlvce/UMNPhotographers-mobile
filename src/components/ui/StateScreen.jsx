import { View, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

const StateScreen = ({ message, isError = false }) => {
  const theme = useTheme();

  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Text style={styles.text}>{isError ? "Ошибка" : message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    opacity: 0.7,
    paddingBottom: 30,
  },
});

export default StateScreen;
