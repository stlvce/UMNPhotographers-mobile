import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

const RequestScreen = () => {
  const theme = useTheme();
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    ></View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RequestScreen;
