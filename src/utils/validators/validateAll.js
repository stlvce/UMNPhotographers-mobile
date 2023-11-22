import validateLink from "./validateLink";
import validateEmail from "./validateEmail";
import validateName from "./validateName";
import validateTg from "./validateTg";
import validatePhone from "./validatePhone";
import validateVk from "./validateVk";

export default function ({
  firstname,
  surname,
  email,
  phone,
  tg,
  vk,
  portfolio,
}) {
  if (!validateLink(portfolio)) {
    return "Не валидная ссылка на портфолио";
  }
  if (!validateEmail(email)) {
    return "Не валидная почта";
  }
  if (!validateName(firstname)) {
    return "Не валидное имя";
  }
  if (!validateName(surname)) {
    return "Не валидная фамилия";
  }
  if (!validatePhone(phone)) {
    return "Не валидный номер телефона";
  }
  if (!validateTg(tg)) {
    return "Не валидный тг";
  }
  if (!validateVk(vk)) {
    return "Не валидный вк";
  }
  return "Valid";
}
