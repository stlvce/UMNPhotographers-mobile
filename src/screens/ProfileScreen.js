import { useCallback, useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Button, Portal, useTheme } from "react-native-paper";
import UploadAvatarInput from "../components/forms/UploadAvatarInput";
import FullNameForm from "../components/forms/FullNameForm";
import ContactForm from "../components/forms/ContactForm";
import PortfolioForm from "../components/forms/PortfolioForm";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import ActionConfirmDialog from "../modals/ActionConfirmDialog";
import { useUserInfoQuery } from "../api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInfo } from "../store/slices/userSlice";
import validateAll from "../utils/validators/validateAll";
import useFormUser from "../hooks/useFormUser";
import * as FileSystem from "expo-file-system";
import StatusUpdateSnackbar from "../components/profile/StatusUpdateSnackbar";
import { logout } from "../store/slices/authSlice";

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
    uri: "https://photographersekb.ru:8080/api/photographer/image",
  });
  const { data, isLoading } = useUserInfoQuery();
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
      if (image.uri.includes("file")) {
        await FileSystem.uploadAsync(
          process.env.EXPO_PUBLIC_API_URL + "/photographer/image",
          image.uri,
          {
            fieldName: "file",
            httpMethod: "POST",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          },
        );
      }
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
    dispatch(logout());
    navigation.replace("Вход");
  }, []);

  useEffect(() => {
    if (data) {
      setUserData(user);
    }
  }, [data]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerKeyboard}
      keyboardVerticalOffset={120}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={{
            ...styles.container,
            backgroundColor: theme.colors.background,
          }}
        >
          <View style={{ gap: 30, padding: 20 }}>
            <UploadAvatarInput value={image} handleChange={handleChangeImage} />
            <FullNameForm
              containerTitle="ФИО"
              value={[
                userData.firstname,
                userData.surname,
                userData.middleName,
              ]}
              handler={handleChange}
              ref={isValidFullNameRef}
            />
            <ContactForm
              value={[userData.email, userData.phone, userData.tg, userData.vk]}
              handler={handleChange}
              isLoading={isLoading}
              ref={isValidContactsRef}
            />
            <PortfolioForm
              value={userData.portfolio}
              handler={handleChange}
              ref={isValidPortfolioRef}
            />
            <View style={styles.buttonContainer}>
              <Button onPress={changeVisibleSaveDialog} mode="contained">
                Сохранить
              </Button>
              <Button onPress={changeVisibleChangePassModal} mode="outlined">
                Сменить пароль
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
            <StatusUpdateSnackbar />
          </Portal>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  containerKeyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
    gap: 10,
  },
  exit: {
    marginTop: 20,
    marginBottom: 40,
    borderColor: "#B3261E",
  },
});

export default ProfileScreen;
