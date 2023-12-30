import { useSelector } from "react-redux";
import TechCard from "../TechCard";

const BatteryCard = ({ item, deleteTech }) => {
  const userTechInfo = useSelector((state) => state.tech.userTechInfo);

  return (
    <TechCard
      tech={item}
      nameType="Аккумулятор"
      additionalInfo={[
        { title: "Количество", value: userTechInfo.batteryCount },
      ]}
      deleteTech={deleteTech}
    />
  );
};

export default BatteryCard;
