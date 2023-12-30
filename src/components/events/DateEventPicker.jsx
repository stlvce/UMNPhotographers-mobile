import { useCallback, useState } from "react";
import { Button } from "react-native-paper";
import {
  DatePickerModal,
  registerTranslation,
  ru,
} from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";

registerTranslation("ru", ru);

const DateEventPicker = ({ varName, value, handler }) => {
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [open]);

  const onConfirmSingle = useCallback(
    ({ date }) => {
      setOpen(false);
      handler(varName, date);
    },
    [open, handler],
  );

  return (
    <SafeAreaProvider>
      <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        {Boolean(value) ? value.toLocaleDateString() : "Выбрать дату"}
      </Button>
      <DatePickerModal
        locale="ru"
        startYear={2023}
        endYear={2024}
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={value}
        onConfirm={onConfirmSingle}
        presentationStyle="pageSheet"
      />
    </SafeAreaProvider>
  );
};

export default DateEventPicker;
