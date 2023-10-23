import { Dialog, Button, Text } from "react-native-paper";

const EndRegisterDialog = ({ visible, changeVisible, handleSubmit }) => {
  return (
    <Dialog visible={visible} onDismiss={changeVisible}>
      <Dialog.Content>
        <Text variant="bodyLarge">Завершить регистрацию?</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={changeVisible}>Нет</Button>
        <Button onPress={handleSubmit}>Да</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default EndRegisterDialog;
