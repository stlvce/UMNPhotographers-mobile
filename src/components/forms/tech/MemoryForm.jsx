import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

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
    label: "Производитель",
    varName: "manufacturer",
  },
  {
    label: "Объем",
    varName: "size",
  },
];

const MemoryForm = () => {
  const [formData, setFormData] = useState({
    rating: "",
    model: "",
    manufacturer: "",
    size: "",
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

export default MemoryForm;
