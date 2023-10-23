import { useCallback, useMemo, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Avatar, Button, Portal } from "react-native-paper";
import SaveSettingProfileModal from "../modals/SaveSettingsProfileModal";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import FullNameForm from "../components/forms/FullNameForm";
import ContactForm from "../components/forms/ContactForm";
import PortfolioForm from "../components/forms/PortfolioForm";

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    surname: "",
    middleName: "",
    birthdate: "",
    contacts: {},
    email: "",
    password: "",
  });
  const [visibleSave, setVisibleSave] = useState(false);
  const [visibleChangePass, setVisibleChangePass] = useState(false);

  const openCloseSaveModal = useCallback(
    () => setVisibleSave((prev) => !prev),
    [visibleSave]
  );

  const openCloseChangePassModal = useCallback(
    () => setVisibleChangePass((prev) => !prev),
    [visibleChangePass]
  );

  const handleLogout = useCallback(() => {
    navigation.navigate("Вход");
  }, []);

  const initials = useMemo(
    () => userData.firstName.slice(0, 1) + userData.surname.slice(0, 1),
    [userData.firstName, userData.surname]
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerImage}>
        <Avatar.Text size={100} label={initials} />
      </View>
      <FullNameForm containerTitle="ФИО" />
      <ContactForm />
      <PortfolioForm />
      <View style={styles.containerForm}>
        <Button onPress={openCloseChangePassModal} mode="outlined">
          Сменить пароль
        </Button>
        <Button onPress={openCloseSaveModal} mode="contained">
          Сохранить
        </Button>
        <Button onPress={handleLogout} mode="contained">
          Выйти
        </Button>
      </View>
      <Portal>
        <ChangePasswordModal
          visible={visibleChangePass}
          closeModal={openCloseChangePassModal}
        />
        <SaveSettingProfileModal
          visible={visibleSave}
          closeModal={openCloseSaveModal}
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
  containerImage: {
    alignItems: "center",
    marginBottom: 20,
  },
  containerForm: {
    gap: 10,
    marginBottom: 20,
  },
});

export default ProfileScreen;
