import TechCard from "../TechCard";

const FlashCard = ({ item, deleteTech }) => {
  return (
    <TechCard
      tech={item}
      nameType="Вспышка"
      additionalInfo={[]}
      deleteTech={deleteTech}
    />
  );
};

export default FlashCard;
