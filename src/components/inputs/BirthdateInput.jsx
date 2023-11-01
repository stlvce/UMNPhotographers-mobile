import { useState, useCallback } from "react";
import { Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ru, registerTranslation } from "react-native-paper-dates";
registerTranslation("ru", ru);

const BirthdateInput = ({ value, handler }) => {
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    ({ date }) => {
      setOpen(false);
      handler("birthdate", date);
    },
    [setOpen, handler]
  );

  return (
    <SafeAreaProvider>
      <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        {Boolean(value) ? value.toLocaleDateString() : "Выбрать дату"}
      </Button>
      <DatePickerModal
        locale="ru"
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

export default BirthdateInput;
