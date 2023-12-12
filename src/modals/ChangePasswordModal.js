import { forwardRef, useState, useRef } from "react";
import { Modal, Text, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import PassForm from "../components/forms/PassForm";
import { useUpdateCredentialMutation } from "../api/userApi";
import { useSelector } from "react-redux";

const ChangePasswordModal = ({ visible, closeModal }, ref) => {
  const user = useSelector((state) => state.user.user);
  const [formData, setFormData] = useState({ password: "", confPass: "" });
  const isValidPasswordRef = useRef(null);
  const [handleUpdatePassword] = useUpdateCredentialMutation();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (isValidPasswordRef.current) {
      handleUpdatePassword({
        email: user.email,
        password: formData.password,
      });
      closeModal();
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={closeModal}
      contentContainerStyle={styles.container}
    >
      <Text variant="titleLarge" style={styles.title}>
        Изменение пароля
      </Text>
      <PassForm
        value={[formData.password, formData.confPass]}
        handler={handleChange}
        label={false}
        ref={isValidPasswordRef}
      />
      <Button style={styles.button} mode="contained" onPress={handleSubmit}>
        Отправить
      </Button>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 5,
    gap: 20,
  },
  title: {
    textAlign: "center",
  },
  button: {
    marginTop: 20,
  },
});

export default forwardRef(ChangePasswordModal);
