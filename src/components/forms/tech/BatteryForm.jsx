import AddedTechForm from "../../ui/AddedTechForm";

const items = [
  {
    label: "Рейтинг",
    varName: "rating",
  },
  {
    label: "Количество",
    varName: "quantity",
  },
];

const initialState = {
  manufacturer: "",
  model: "",
  quantity: "",
  rating: "",
};

const BatteryForm = ({ navigation }) => {
  return (
    <AddedTechForm
      initialFormData={initialState}
      additionalFormItems={items}
      type="battery"
      navigation={navigation}
    />
  );
};

export default BatteryForm;
