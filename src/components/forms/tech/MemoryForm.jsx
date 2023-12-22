import AddedTechForm from "../../tech/AddedTechForm";

const items = [
  {
    label: "Объем",
    varName: "size",
  },
];

const initialState = {
  manufacturer: "",
  model: "",
  size: "",
};

const MemoryForm = ({ navigation }) => {
  return (
    <AddedTechForm
      initialFormData={initialState}
      additionalFormItems={items}
      type="memory"
      navigation={navigation}
    />
  );
};

export default MemoryForm;
