import CameraForm from "../forms/tech/CameraForm";
import BatteryForm from "../forms/tech/BatteryForm";
import FlashForm from "../forms/tech/FlashForm";
import LensForm from "../forms/tech/LensForm";
import MemoryForm from "../forms/tech/MemoryForm";

const FormReturner = ({ type, navigation }) => {
  if (type === "Камера") {
    return <CameraForm navigation={navigation} />;
  }

  if (type === "Аккумулятор") {
    return <BatteryForm navigation={navigation} />;
  }

  if (type === "Вспышка") {
    return <FlashForm navigation={navigation} />;
  }

  if (type === "Оптика") {
    return <LensForm navigation={navigation} />;
  }

  if (type === "Карта памяти") {
    return <MemoryForm navigation={navigation} />;
  }
};

export default FormReturner;
