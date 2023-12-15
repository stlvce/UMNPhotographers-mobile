import { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ru, registerTranslation } from "react-native-paper-dates";
registerTranslation("ru", ru);

const BirthdateInput = ({ value, handler }) => {
  const [open, setOpen] = useState(false);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [open]);

  const onConfirmSingle = useCallback(
    ({ date }) => {
      setOpen(false);
      handler("birthdate", date);
    },
    [open, value],
  );

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Дата рождения</Text>
      <SafeAreaProvider>
        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
          {Boolean(value)
            ? `Дата рождения: ${value.toLocaleDateString()}`
            : "Выбрать дату"}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 20,
  },
});

export default BirthdateInput;
