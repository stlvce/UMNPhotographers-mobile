import AddedTechForm from "../../ui/AddedTechForm";

const items = [
  {
    label: "Количество",
    varName: "quantity",
  },
  {
    label: "Рейтинг",
    varName: "rating",
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
