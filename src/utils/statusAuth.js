export default function (data, error) {
  if (!data?.authenticate && data?.status === "created") {
    return "Ваш профиль еще не подтвержден. Попробуйте написать куратору фотографов и авторизоваться позднее.";
  } else if (data?.status === "blocked") {
    return "Вы заблокированы. Попробуйте написать куратору фотографов и авторизоваться позднее.";
  } else if (error?.status === 500) {
    return "Вы ввели неверные данные авторизации. Проверьте введенные данные или напишите куратору фотографов.";
  } else if (error?.data) {
    return `${error?.status} ${error?.data?.message}`;
  }
  // TODO: Добавить статус при плохом соединении:
  // У вас нестабильное интернет соединение. Попробуйте подключитьтся к другой сети или повторите попытку позднее.
  return `${error?.status} ${error?.error}`;
}
