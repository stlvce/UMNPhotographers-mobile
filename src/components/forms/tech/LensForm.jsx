import AddedTechForm from "../../ui/AddedTechForm";

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
  cameraId: null,
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
