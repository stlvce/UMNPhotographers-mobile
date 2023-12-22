export default function (data, error) {
  if (!data?.authenticate && data?.status === "created") {
    return "Ваш профиль еще не подтвержден. Попробуйте написать куратору фотографов и авторизоваться позднее.";
  }

  if (data?.status === "blocked") {
    return "Вы заблокированы. Попробуйте написать куратору фотографов и авторизоваться позднее.";
  }

  if (error?.status === 500) {
    return "Вы ввели неверные данные авторизации. Проверьте введенные данные или напишите куратору фотографов.";
  }

  if (error?.status === 408) {
    return "У вас нестабильное интернет соединение. Попробуйте подключитьтся к другой сети или повторите попытку позднее.";
  }

  if (error?.status === 404) {
    return "Пользователь ненайден.";
  }

  if (error?.data) {
    return `${error?.status} ${error?.data?.message}`;
  }

  return `${error?.status} ${error?.error}`;
}
