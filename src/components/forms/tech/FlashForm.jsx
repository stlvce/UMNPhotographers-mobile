import AddedTechForm from "../../ui/AddedTechForm";

const items = [
  {
    label: "Рейтинг",
    varName: "rating",
  },
];

const initialState = {
  manufacturer: "",
  model: "",
  rating: "",
};

const FlashForm = ({ navigation }) => {
  return (
    <AddedTechForm
      initialFormData={initialState}
      additionalFormItems={items}
      type="flash"
      navigation={navigation}
    />
  );
};

export default FlashForm;
