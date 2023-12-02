import AddedTechForm from "../../ui/AddedTechForm";

const items = [
  {
    label: "Кроп-фактор",
    varName: "crop",
  },
  {
    label: "Рейтинг",
    varName: "rating",
  },
];

const initialState = {
  rating: "",
  manufacturer: "",
  model: "",
  crop: "",
  type: "camera",
};

const CameraForm = ({ navigation }) => {
  return (
    <AddedTechForm
      initialFormData={initialState}
      additionalFormItems={items}
      type="camera"
      navigation={navigation}
    />
  );
};

export default CameraForm;
