import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import {
  useReceiveTechModelsQuery,
  useReceiveManufacturerQuery,
} from "../../../api/techApi";
import AddedTechForm from "../../ui/AddedTechForm";

// TODO: не работает, нужно ещё связать с камерой
const items = [
  {
    label: "Фокусное расстояние",
    varName: "focus",
  },
  {
    label: "Рейтинг",
    varName: "rating",
  },
];

const initialState = {
  manufacturer: "",
  model: "",
  focus: "",
  rating: "",
};

const LeensForm = ({ navigation }) => {
  return (
    <AddedTechForm
      initialFormData={initialState}
      additionalFormItems={items}
      type="leens"
      navigation={navigation}
    />
  );
};

export default LeensForm;
