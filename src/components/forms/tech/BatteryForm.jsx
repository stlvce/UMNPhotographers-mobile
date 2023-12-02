import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import {
  useReceiveTechModelsQuery,
  useReceiveManufacturerQuery,
  useReceiveTechModelByNameMutation,
} from "../../../api/techApi";

const items = [
  {
    label: "Рейтинг",
    varName: "rating",
  },
  {
    label: "Модель",
    varName: "model",
  },
  {
    label: "Количество",
    varName: "quantity",
  },
];

const BatteryForm = () => {
  const [formData, setFormData] = useState({
    rating: "",
    model: "",
    quantity: "",
  });
  const { data: techModels } = useReceiveTechModelsQuery("battery");
  const { data: techManufacturer } = useReceiveManufacturerQuery("battery");

  const handleChange = (varName, newValue) => {
    setFormData({ ...formData, [varName]: newValue });
  };

  const handleSubmit = () => {};

  return (
    <View style={styles.container}>
      {items.map((item) => (
        <TextInput
          mode="outlined"
          label={item.label}
          value={formData[item.varName]}
          onChangeText={(e) => handleChange(item.varName, e)}
          key={item.varName}
        />
      ))}
      <Button style={styles.button} mode="contained" onPress={handleSubmit}>
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
});

export default BatteryForm;
