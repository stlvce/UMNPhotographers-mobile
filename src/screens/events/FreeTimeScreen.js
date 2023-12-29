import { ScrollView } from "react-native";
import { useTheme } from "react-native-paper";

const FreeTimeScreen = ({ route }) => {
  const theme = useTheme();
  const eventId = route.params;

  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.background }}
    ></ScrollView>
  );
};

export default FreeTimeScreen;
