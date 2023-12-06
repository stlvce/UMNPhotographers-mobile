import { View, StyleSheet } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import { useTheme } from "react-native-paper";
import { useEffect } from "react";

const CameraRadioGroup = ({ cameraId, handler }) => {
  const theme = useTheme();
  const technique = useSelector((state) => state.tech.userTechInfo.technique);

  const cameraList = technique.filter((item) => item.type === "camera");

  useEffect(() => {
    if (!(cameraList.length === 0)) handler("cameraId", cameraList[0].id);
  }, []);

  if (cameraList.length === 0) {
    return (
      <Text style={{ ...styles.message, color: theme.colors.error }}>
        Добавьте камеру, чтобы добавить оптику
      </Text>
    );
  }

  return (
    <RadioButton.Group
      onValueChange={(e) => handler("cameraId", e)}
      value={cameraId}
    >
      {cameraList.map((item) => (
        <RadioButton.Item
          label={`${item.model.name} (Кроп-фактор: ${item.crop})`}
          value={item.id}
          key={item.id}
        />
      ))}
    </RadioButton.Group>
  );
};

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    marginTop: 10,
  },
});

export default CameraRadioGroup;
