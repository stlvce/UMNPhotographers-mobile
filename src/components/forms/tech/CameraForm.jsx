import AddedTechForm from "../../tech/AddedTechForm";

const items = [
  {
    label: "Кроп-фактор",
    varName: "crop",
  },
];

const initialState = {
  manufacturer: "",
  model: "",
  crop: "",
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
