import { forwardRef, useState, useRef } from "react";
import { View } from "react-native";
import { Modal, Text, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import PassForm from "../components/forms/PassForm";

const ChangePasswordModal = ({ visible, closeModal }, ref) => {
  const [formData, setFormData] = useState({ password: "", confPass: "" });
  const isValidPasswordRef = useRef(null);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {};

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
