import { Modal, Text } from "react-native-paper";

const ChangePasswordModal = ({ visible, closeModal }) => {
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
      <Text variant="titleMedium">Изменение пароля</Text>
      
    </Modal>
  );
};

export default ChangePasswordModal;
