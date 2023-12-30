import TechCard from "../TechCard";

const LensCard = ({ item, deleteTech }) => {
  return (
    <TechCard
      tech={item}
      nameType="Оптика"
      additionalInfo={[
        { title: "Фокусное расстояние", value: item.focus },
        {
          title: "Камера",
          value: `${item.camera?.model.name} (Кроп-фактор: ${item.camera?.crop})`,
        },
      ]}
      deleteTech={deleteTech}
    />
  );
};

export default LensCard;
