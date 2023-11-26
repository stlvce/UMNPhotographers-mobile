import { useCallback, useRef, useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
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
import validateAll from "../utils/validators/validateAll";
import useFormUser from "../hooks/useFormUser";
import * as FileSystem from "expo-file-system";

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
  const [userData, handleChange, setUserData] =
    useFormUser(initialStateUserData);
  const [image, setImage] = useState({
    uri: "https://photographersekb.ru:8080/api/photographer/download",
  });
  const { data } = useUserInfoQuery();
  const [visibleChangePass, setVisibleChangePass] = useState(false);
  const [visibleSaveDialog, setVisibleSaveDialog] = useState(false);
  const [visibleExitDialog, setVisibleExitDialog] = useState(false);
  const isValidFullNameRef = useRef(null);
  const isValidContactsRef = useRef(null);
  const isValidPortfolioRef = useRef(null);

  const handleChangeImage = useCallback(
    (newValue) => {
      setImage(newValue);
    },
    [image],
  );

  const changeVisibleSaveDialog = useCallback(() => {
    const isValidAll = validateAll(userData);
    if (
      (isValidFullNameRef.current &&
        isValidContactsRef.current &&
        isValidPortfolioRef.current) ||
      isValidAll === "Valid"
    ) {
      setVisibleSaveDialog((prev) => !prev);
    }
  }, [
    userData,
    isValidFullNameRef.current,
    isValidContactsRef.current,
    isValidPortfolioRef.current,
  ]);

  const handleSave = useCallback(async () => {
    try {
      await FileSystem.uploadAsync(
        process.env.EXPO_PUBLIC_API_URL + "/photographer/upload",
        image.uri,
        {
          fieldName: "file",
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        },
      );
      dispatch(updateUserInfo(userData));
    } catch (error) {
      console.log(error);
    } finally {
      changeVisibleSaveDialog();
    }
  }, [userData, image]);

  const changeVisibleChangePassModal = useCallback(
    () => setVisibleChangePass((prev) => !prev),
    [visibleChangePass],
  );

  const changeVisibleExitDialog = useCallback(() => {
    setVisibleExitDialog((prev) => !prev);
  }, [setVisibleExitDialog]);

  const handleLogout = useCallback(async () => {
    await AsyncStorage.removeItem("SESSION");
    navigation.replace("Вход");
  }, []);

  useEffect(() => {
    if (data) {
      setUserData(user);
    }
  }, [data]);

  return (
    // TODO: настроить высоту инпута при открыктии клавиатуры x2
    <ScrollView style={styles.container}>
      <UploadAvatarInput value={image} handleChange={handleChangeImage} />
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
