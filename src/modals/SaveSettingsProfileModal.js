import { Modal, Text, Button } from "react-native-paper";
import { View } from "react-native";

const SaveSettingProfileModal = ({ visible, closeModal }) => {
  return (
    <Modal
      visible={visible}
      onDismiss={closeModal}
      contentContainerStyle={{
        backgroundColor: "white",
        padding: 20,
        marginHorizontal: 10,
      }}
    >
      <Text variant="titleMedium">Сохранить изменения?</Text>
      <View>
        <Button mode="outlined">Нет</Button>
        <Button mode="contained">Да</Button>
      </View>
    </Modal>
  );
};

export default SaveSettingProfileModal;
