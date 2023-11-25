import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

const items = [
  {
    label: "Рейтинг",
    varName: "rating",
  },
  {
    label: "Производитель",
    varName: "manufacturer",
  },
  {
    label: "Модель",
    varName: "model",
  },
  {
    label: "Кроп-фактор",
    varName: "crop",
  },
];

const CameraForm = () => {
  const [formData, setFormData] = useState({
    rating: "",
    manufacturer: "",
    model: "",
    crop: "",
  });

  const handleChange = (varName, newValue) => {
    setFormData({ ...formData, [varName]: newValue });
  };

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
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => console.log(formData)}
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
});

export default CameraForm;
