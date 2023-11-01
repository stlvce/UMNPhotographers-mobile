export default function (phone) {
  const regExp = /^[0-9]+$/;
  return phone.length === 10 && regExp.test(phone);
}
