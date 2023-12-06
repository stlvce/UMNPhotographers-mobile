import AddedTechForm from "../../ui/AddedTechForm";

const items = [];

const initialState = {
  manufacturer: "",
  model: "",
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
