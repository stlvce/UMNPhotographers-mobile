import AddedTechForm from "../../ui/AddedTechForm";

const items = [
  {
    label: "Объем",
    varName: "size",
  },
  {
    label: "Рейтинг",
    varName: "rating",
  },
];

const initialState = {
  manufacturer: "",
  model: "",
  size: "",
  rating: "",
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
