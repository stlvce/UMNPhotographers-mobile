import CameraCard from "./cards/CameraCard";
import BatteryCard from "./cards/BatteryCard";
import FlashCard from "./cards/FlashCard";
import LensCard from "./cards/LensCard";
import MemoryCard from "./cards/MemoryCard";

const TechCardReturner = ({ item, deleteTech }) => {
  if (item.type === "camera") {
    return <CameraCard item={item} deleteTech={deleteTech} />;
  }

  if (item.type === "battery") {
    return <BatteryCard item={item} deleteTech={deleteTech} />;
  }

  if (item.type === "flash") {
    return <FlashCard item={item} deleteTech={deleteTech} />;
  }

  if (item.type === "lens") {
    return <LensCard item={item} deleteTech={deleteTech} />;
  }

  if (item.type === "memory") {
    return <MemoryCard item={item} deleteTech={deleteTech} />;
  }
};

export default TechCardReturner;
