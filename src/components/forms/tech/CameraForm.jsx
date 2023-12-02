import { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import {
  useReceiveTechModelsQuery,
  useReceiveManufacturerQuery,
} from "../../../api/techApi";
import { saveTech } from "../../../store/slices/techSlice";
import { useDispatch } from "react-redux";

const formItems = [
  {
    label: "Кроп-фактор",
    varName: "crop",
  },
  {
    label: "Рейтинг",
    varName: "rating",
  },
];

const CameraForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    rating: "",
    manufacturer: "",
    model: "",
    crop: "",
    type: "camera",
  });
  const [isVisibleModelsList, setIsVisibleModelsList] = useState(false);
  const [isVisibleManufList, setIsVisibleManufList] = useState(false);
  const { data: techModels } = useReceiveTechModelsQuery("camera");
  const { data: techManufacturer } = useReceiveManufacturerQuery("camera");

  const handleChange = (varName, newValue) => {
    setFormData({ ...formData, [varName]: newValue });
  };

  const handleSubmit = () => {
    dispatch(saveTech(formData));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 20 }}>
        <TextInput
          mode="outlined"
          label="Производитель"
          value={formData.manufacturer}
          onChangeText={(e) => handleChange("manufacturer", e)}
          onFocus={() => setIsVisibleManufList(true)}
          onBlur={(e) => {
            /*setIsVisibleManufList(false);*/
          }}
        />
        {isVisibleManufList &&
          Boolean(
            techManufacturer?.filter((item) =>
              item.name.includes(formData.manufacturer),
            ).length,
          ) && (
            <View style={styles.searchList}>
              {techManufacturer
                ?.filter((item) => item.name.includes(formData.manufacturer))
                .map((item) => (
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => {
                      handleChange("manufacturer", item.name);
                      setIsVisibleManufList(false);
                    }}
                    activeOpacity={0.9}
                    key={item.id}
                  >
                    <Text variant="bodyLarge">{item.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
      </View>
      <View style={{ zIndex: 19 }}>
        <TextInput
          mode="outlined"
          label="Модель"
          value={formData.model}
          onChangeText={(e) => handleChange("model", e)}
          onFocus={() => setIsVisibleModelsList(true)}
          onBlur={(e) => {
            /*setIsVisibleModelsList(false);*/
          }}
        />
        {isVisibleModelsList &&
          Boolean(
            techModels?.filter((item) => item.name.includes(formData.model))
              .length,
          ) && (
            <View style={styles.searchList}>
              {techModels
                ?.filter((item) => item.name.includes(formData.model))
                .map((item) => (
                  <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => {
                      handleChange("model", item.name);
                      setIsVisibleModelsList(false);
                    }}
                    activeOpacity={0.9}
                    key={item.id}
                  >
                    <Text variant="bodyLarge">{item.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}
      </View>
      {formItems.map((item) => (
        <TextInput
          style={{ zIndex: -10000 }}
          mode="outlined"
          label={item.label}
          value={formData[item.varName]}
          onChangeText={(e) => handleChange(item.varName, e)}
          key={item.varName}
        />
      ))}
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit}
        disabled={Object.values(formData).includes("")}
      >
        Добавить
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  button: {
    marginTop: 15,
  },
  searchList: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    left: 0,
    right: 0,
    top: 50,
    paddingTop: 10,
    zIndex: -1,
    gap: 10,
  },
});

export default CameraForm;
