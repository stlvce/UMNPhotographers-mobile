import TechCard from "../TechCard";

const CameraCard = ({ item, deleteTech }) => {
  return (
    <TechCard
      tech={item}
      nameType="Камера"
      additionalInfo={[{ title: "Кроп-фактор", value: item.crop }]}
      deleteTech={deleteTech}
    />
  );
};

export default CameraCard;
