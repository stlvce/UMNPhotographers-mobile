import { useEffect } from "react";
import { View } from "react-native";
import { Icon, Snackbar, Text, useTheme } from "react-native-paper";

const StatusSnackbar = ({
  isVisible,
  message,
  errorMessage,
  closeSnackbar,
}) => {
  const theme = useTheme();

  useEffect(() => {
    if (isVisible) {
      setTimeout(closeSnackbar, 3000);
    }
  }, [isVisible]);

  return (
    <Snackbar
      style={{ marginBottom: 50 }}
      visible={isVisible}
      onDismiss={() => {}}
      icon="plus"
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {errorMessage ? (
          <Icon size={22} source="close" color={theme.colors.error} />
        ) : (
          <Icon size={22} source="check" color={theme.colors.success} />
        )}
        <Text style={{ color: "white" }}>{errorMessage || message}</Text>
      </View>
    </Snackbar>
  );
};

export default StatusSnackbar;
