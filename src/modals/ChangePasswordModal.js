import { forwardRef, useState, useRef } from "react";
import { Modal, Text, Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import PassForm from "../components/forms/PassForm";

const ChangePasswordModal = ({ visible, closeModal }, ref) => {
  const [data, setData] = useState({ password: "" });
  const isValidPasswordRef = useRef(null);

  const handleChange = (name, value) => {
    setData({ [name]: value });
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
        password={data.password}
        handler={handleChange}
        label={false}
        ref={isValidPasswordRef}
      />
      <Button mode="contained" style={styles.button} onPress={handleSubmit}>
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
