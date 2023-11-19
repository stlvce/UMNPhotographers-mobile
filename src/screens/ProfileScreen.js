import { useCallback, useRef, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Portal, useTheme } from "react-native-paper";
import UploadAvatarInput from "../components/forms/UploadAvatarInput";
import FullNameForm from "../components/forms/FullNameForm";
import ContactForm from "../components/forms/ContactForm";
import PortfolioForm from "../components/forms/PortfolioForm";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import ActionConfirmDialog from "../modals/ActionConfirmDialog";
import { useUserInfoQuery } from "../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../store/slices/userSlice";

const initialStateUserData = {
  firstname: "",
  surname: "",
  middleName: "",
  email: "",
  phone: "",
  tg: "",
  vk: "",
  portfolio: "",
};

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const { data, error } = useUserInfoQuery();
  const [userData, setUserData] = useState(initialStateUserData);
  const [visibleChangePass, setVisibleChangePass] = useState(false);
  const [visibleSaveDialog, setVisibleSaveDialog] = useState(false);
  const [visibleExitDialog, setVisibleExitDialog] = useState(false);
  const isValidFullNameRef = useRef(null);
  const isValidContactsRef = useRef(null);
  const isValidPortfolioRef = useRef(null);

  const handleChange = useCallback(
    (name, value) => {
      setUserData({ ...userData, [name]: value });
    },
    [userData],
  );

  const handleSave = useCallback(() => {
    if (isValidFullNameRef.current && isValidContactsRef.current) {
      dispatch(updateUserInfo(userData));
      changeVisibleSaveDialog();
    }
  }, [userData, , isValidFullNameRef.current, isValidContactsRef.current]);

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem("SESSION");
    navigation.replace("Вход");
  }, []);

  const changeVisibleChangePassModal = useCallback(
    () => setVisibleChangePass((prev) => !prev),
    [visibleChangePass],
  );

  const changeVisibleSaveDialog = useCallback(() => {
    if (isValidFullNameRef.current && isValidContactsRef.current) {
      setVisibleSaveDialog((prev) => !prev);
    }
  }, [userData, isValidFullNameRef.current, isValidContactsRef.current]);

  const changeVisibleExitDialog = useCallback(() => {
    setVisibleExitDialog((prev) => !prev);
  }, [setVisibleExitDialog]);

  useEffect(() => {
    if (data) {
      setUserData(user);
    }
  }, [data]);

  return (
    // TODO: настроить высоту инпута при открыктии клавиатуры x2
    <ScrollView style={styles.container}>
      <UploadAvatarInput />
      <FullNameForm
        containerTitle="ФИО"
        value={[userData.firstname, userData.surname, userData.middleName]}
        handler={handleChange}
        ref={isValidFullNameRef}
      />
      <ContactForm
        value={[userData.email, userData.phone, userData.tg, userData.vk]}
        handler={handleChange}
        ref={isValidContactsRef}
      />
      <PortfolioForm
        value={userData.portfolio}
        handler={handleChange}
        ref={isValidPortfolioRef}
      />
      <View style={styles.buttonContainer}>
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
  buttonContainer: {
    gap: 10,
    marginBottom: 20,
  },
  exit: {
    marginVertical: 20,
    borderColor: "#B3261E",
  },
});

export default ProfileScreen;
