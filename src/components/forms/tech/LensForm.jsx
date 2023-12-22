import AddedTechForm from "../../tech/AddedTechForm";

const items = [
  {
    label: "Фокусное расстояние",
    varName: "focus",
  },
];

const initialState = {
  manufacturer: "",
  model: "",
  focus: "",
  cameraId: "",
};

const LensForm = ({ navigation }) => {
  return (
    <AddedTechForm
      initialFormData={initialState}
      additionalFormItems={items}
      type="lens"
      navigation={navigation}
    />
  );
};

export default LensForm;
