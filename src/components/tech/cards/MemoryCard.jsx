import TechCard from "../TechCard";

const MemoryCard = ({ item, deleteTech }) => {
  return (
    <TechCard
      tech={item}
      nameType="Карта памяти"
      additionalInfo={[{ title: "Объем", value: item.size }]}
      deleteTech={deleteTech}
    />
  );
};

export default MemoryCard;
