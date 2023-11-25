import CameraForm from "../forms/tech/CameraForm";
import BatteryForm from "../forms/tech/BatteryForm";
import FlashForm from "../forms/tech/FlashForm";
import LeensForm from "../forms/tech/LeensForm";
import MemoryForm from "../forms/tech/MemoryForm";

const FormReturner = ({ type }) => {
  if (type === "Камера") {
    return <CameraForm />;
  }

  if (type === "Батарея") {
    return <BatteryForm />;
  }

  if (type === "Вспышка") {
    return <FlashForm />;
  }

  if (type === "Линзы") {
    return <LeensForm />;
  }

  if (type === "Память") {
    return <MemoryForm />;
  }
};

export default FormReturner;
