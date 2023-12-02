import CameraForm from "../forms/tech/CameraForm";
import BatteryForm from "../forms/tech/BatteryForm";
import FlashForm from "../forms/tech/FlashForm";
import LeensForm from "../forms/tech/LeensForm";
import MemoryForm from "../forms/tech/MemoryForm";

const FormReturner = ({ type, navigation }) => {
  if (type === "Камера") {
    return <CameraForm navigation={navigation} />;
  }

  if (type === "Батарея") {
    return <BatteryForm navigation={navigation} />;
  }

  if (type === "Вспышка") {
    return <FlashForm navigation={navigation} />;
  }

  if (type === "Линзы") {
    return <LeensForm navigation={navigation} />;
  }

  if (type === "Память") {
    return <MemoryForm navigation={navigation} />;
  }
};

export default FormReturner;
