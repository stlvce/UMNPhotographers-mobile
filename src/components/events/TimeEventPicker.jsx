import { useCallback, useState } from "react";
import { Button } from "react-native-paper";
import {
  TimePickerModal,
  registerTranslation,
  ru,
} from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

registerTranslation("ru", ru);

const TimeEventPicker = ({ label, varName, value, handler }) => {
  const [visible, setVisible] = useState(false);
  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [visible]);

  const onConfirm = useCallback(
    (newValue) => {
      setVisible(false);
      handler(varName, newValue);
    },
    [handler],
  );

  return (
    <SafeAreaProvider>
      <Button
        onPress={() => setVisible(true)}
        uppercase={false}
        mode="outlined"
      >
        {value.hours !== null
          ? `${label}: ${value.hours < 10 ? "0" + value.hours : value.hours}:${
              value.minutes < 10 ? "0" + value.minutes : value.minutes
            }`
          : label}
      </Button>
      <TimePickerModal
        label={`${label} съемок`}
        cancelLabel="Отмена"
        confirmLabel="Готова"
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        hours={value.hours}
        minutes={value.minutes}
      />
    </SafeAreaProvider>
  );
};

export default TimeEventPicker;
