// Валидация пароля
export default function (password) {
  const PASS_REGEXP = /^[A-Za-z0-9]+$/;
  // TODO: потом поменять на 6
  return password.length >= 5 && PASS_REGEXP.test(password);
}
