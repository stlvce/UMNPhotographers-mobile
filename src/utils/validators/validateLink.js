export default function (link) {
  const regExp = /^(http|https):\/\/[a-z0-9.].[a-z]\/+$/;
  return regExp.test(link);
}
