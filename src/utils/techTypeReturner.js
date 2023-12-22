export default function (type) {
  if (type === "camera") {
    return "Камеры";
  }

  if (type === "battery") {
    return "Аккумуляторы";
  }

  if (type === "flash") {
    return "Вспышки";
  }

  if (type === "lens") {
    return "Оптика";
  }

  if (type === "memory") {
    return "Карты памяти";
  }
}
