import { useEffect } from "react";
import { Snackbar } from "react-native-paper";

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
    >
      {errorMessage || message}
    </Snackbar>
  );
};

export default StatusSnackbar;
