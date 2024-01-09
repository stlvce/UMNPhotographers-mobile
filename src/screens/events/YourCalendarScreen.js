import { View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";

const YourCalendarScreen = () => {
  const theme = useTheme();
  return (
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Text style={{ opacity: 0.7 }}>Ваше расписание пока ещё не готово</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default YourCalendarScreen;
