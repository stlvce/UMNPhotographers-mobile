import { useCallback, useMemo, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Portal, useTheme } from "react-native-paper";
import UploadAvatarForm from "../components/forms/UploadAvatarForm";
import FullNameForm from "../components/forms/FullNameForm";
import ContactForm from "../components/forms/ContactForm";
import PortfolioForm from "../components/forms/PortfolioForm";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import ActionConfirmDialog from "../modals/ActionConfirmDialog";

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const [userData, setUserData] = useState({
    firstName: "",
    surname: "",
    middleName: "",
    birthdate: "",
    contacts: {},
    email: "",
    password: "",
  });
  const [visibleChangePass, setVisibleChangePass] = useState(false);
  const [visibleSaveDialog, setVisibleSaveDialog] = useState(false);
  const [visibleExitDialog, setVisibleExitDialog] = useState(false);

  const handleChange = useCallback(() => {}, [setUserData]);

  const handleSave = useCallback(() => {
    changeVisibleSaveDialog();
  }, [userData]);

  const handleLogout = useCallback(() => {
    navigation.navigate("Вход");
  }, []);

  const changeVisibleChangePassModal = useCallback(
    () => setVisibleChangePass((prev) => !prev),
    [visibleChangePass]
  );

  const changeVisibleSaveDialog = useCallback(() => {
    setVisibleSaveDialog((prev) => !prev);
  }, [setVisibleSaveDialog]);

  const changeVisibleExitDialog = useCallback(() => {
    setVisibleExitDialog((prev) => !prev);
  }, [setVisibleExitDialog]);

  // const initials = useMemo(
  //   () => userData.firstName.slice(0, 1) + userData.surname.slice(0, 1),
  //   [userData.firstName, userData.surname]
  // );

  return (
    <ScrollView style={styles.container}>
      <UploadAvatarForm />
      <FullNameForm containerTitle="ФИО" />
      <ContactForm />
      <PortfolioForm />
      <View style={styles.containerForm}>
        <Button onPress={changeVisibleChangePassModal} mode="outlined">
          Сменить пароль
        </Button>
        <Button onPress={changeVisibleSaveDialog} mode="contained">
          Сохранить
        </Button>
        <Button
          style={styles.exit}
          onPress={changeVisibleExitDialog}
          mode="outlined"
          textColor={theme.colors.error}
          icon="logout"
        >
          Выйти
        </Button>
      </View>
      <Portal>
        <ChangePasswordModal
          visible={visibleChangePass}
          closeModal={changeVisibleChangePassModal}
        />
        <ActionConfirmDialog
          question="Сохранить изменения?"
          visible={visibleSaveDialog}
          changeVisible={changeVisibleSaveDialog}
          handleSubmit={handleSave}
        />
        <ActionConfirmDialog
          question="Вы уверены, что хотите выйти?"
          visible={visibleExitDialog}
          changeVisible={changeVisibleExitDialog}
          handleSubmit={handleLogout}
        />
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  containerForm: {
    gap: 10,
    marginBottom: 20,
  },
  exit: {
    marginVertical: 20,
    borderColor: "#B3261E",
  },
});

export default ProfileScreen;
