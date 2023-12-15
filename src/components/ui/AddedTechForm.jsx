import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { saveTech } from "../../store/slices/techSlice";
import {
  useReceiveManufacturerQuery,
  useReceiveTechModelsQuery,
} from "../../api/techApi";
import CameraRadioGroup from "../tech/CameraRadioGroup";
import LiveResultModal from "../../modals/LiveResultModal";

const AddedTechForm = ({
  initialFormData,
  additionalFormItems,
  type,
  navigation,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const { data: techModels, refetch: refetchModels } =
    useReceiveTechModelsQuery(type);
  const { data: techManufacturer, refetch: refetchManufac } =
    useReceiveManufacturerQuery(type);

  const [modalVisible, setModalVisible] = useState(false);
  const [isVisibleModelModal, setIsVisibleModelModal] = useState(false);
  const [isVisibleManufacModal, setIsVisibleManufacModal] = useState(false);

  const handleChange = (varName, newValue) => {
    setFormData({ ...formData, [varName]: newValue });
  };

  // TODO: получение новой моделей и производителей
  const handleSubmit = () => {
    dispatch(saveTech({ ...formData, type: type }));
    navigation.goBack();
  };

  const changeVisibleModelModal = () => {
    setIsVisibleModelModal(!isVisibleModelModal);
  };

  const changeVisibleManufacModal = () => {
    setIsVisibleManufacModal(!isVisibleManufacModal);
  };

  return (
    <View style={styles.container}>
      <Button
        mode="outlined"
        labelStyle={
          Boolean(formData.model) && { color: theme.colors.secondary }
        }
        onPress={changeVisibleModelModal}
      >
        {Boolean(formData.model)
          ? `Модель: ${formData.model}`
          : "Выбрать модель"}
      </Button>
      <Button
        mode="outlined"
        labelStyle={
          Boolean(formData.manufacturer) && { color: theme.colors.secondary }
        }
        onPress={changeVisibleManufacModal}
      >
        {Boolean(formData.manufacturer)
          ? `Производитель: ${formData.manufacturer}`
          : "Выбрать производителя"}
      </Button>
      {additionalFormItems.map((item) => (
        <TextInput
          style={styles.otherInput}
          mode="outlined"
          label={item.label}
          value={formData[item.varName]}
          onChangeText={(e) => handleChange(item.varName, e)}
          key={item.varName}
        />
      ))}
      {type === "lens" && (
        <CameraRadioGroup cameraId={formData.cameraId} handler={handleChange} />
      )}
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit}
        disabled={Object.values(formData).includes("")}
      >
        Добавить
      </Button>
      <LiveResultModal
        modalTitle="Модель техники"
        isVisible={isVisibleModelModal}
        closeModal={changeVisibleModelModal}
        placeholder="Название модели"
        varName="model"
        initialList={techModels}
        searchLetters={formData.model}
        handler={handleChange}
      />
      <LiveResultModal
        modalTitle="Производитель техники"
        isVisible={isVisibleManufacModal}
        closeModal={changeVisibleManufacModal}
        placeholder="Название производителя"
        varName="manufacturer"
        initialList={techManufacturer}
        searchLetters={formData.manufacturer}
        handler={handleChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  otherInput: {
    zIndex: -2,
  },
  button: {
    marginTop: 15,
  },
  centeredView: {
    flex: 1,
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AddedTechForm;
