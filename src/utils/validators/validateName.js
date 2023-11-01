// Валидация ФИО
export default function (name) {
  const regExp = /^[А-Я]+[а-я]+$/;

  return regExp.test(name);
}
