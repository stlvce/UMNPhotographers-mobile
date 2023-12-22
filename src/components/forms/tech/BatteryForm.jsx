import AddedTechForm from "../../tech/AddedTechForm";

const items = [
  {
    label: "Количество",
    varName: "quantity",
  },
];

const initialState = {
  manufacturer: "",
  model: "",
  quantity: "",
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
