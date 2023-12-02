import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { saveTech } from "../../store/slices/techSlice";
import {
  useReceiveManufacturerQuery,
  useReceiveTechModelsQuery,
} from "../../api/techApi";
import LiveResultInput from "./LiveResultInput";

const AddedTechForm = ({
  initialFormData,
  additionalFormItems,
  type,
  navigation,
}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormData);
  const { data: techModels } = useReceiveTechModelsQuery(type);
  const { data: techManufacturer } = useReceiveManufacturerQuery(type);

  const handleChange = (varName, newValue) => {
    setFormData({ ...formData, [varName]: newValue });
  };

  const handleSubmit = () => {
    dispatch(saveTech({ ...formData, type: type }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <LiveResultInput
        style={{ zIndex: 20 }}
        label="Производитель"
        varName="manufacturer"
        initialList={techManufacturer}
        searchLetters={formData.manufacturer}
        handler={handleChange}
      />
      <LiveResultInput
        style={{ zIndex: 19 }}
        label="Модель"
        varName="model"
        initialList={techModels}
        searchLetters={formData.model}
        handler={handleChange}
      />
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
  otherInput: {
    zIndex: -2,
  },
  button: {
    marginTop: 15,
  },
});

export default AddedTechForm;
