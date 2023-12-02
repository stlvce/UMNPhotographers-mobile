import { useEffect } from "react";
import { View } from "react-native";
import { Icon, Snackbar, Text } from "react-native-paper";

const StatusSnackbar = ({
  isVisible,
  message,
  errorMessage,
  closeSnackbar,
}) => {
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
          <Icon size={22} source="close" color="red" />
        ) : (
          <Icon size={22} source="check" color="green" />
        )}
        <Text style={{ color: "white" }}>{errorMessage || message}</Text>
      </View>
    </Snackbar>
  );
};

export default StatusSnackbar;
