export default function (link) {
  const regExp = /^http[s]?:\/\/[a-zA-Z\d.-]+[:]?[\d]{0,4}[\/]?[a-zA-Z\d\/-]+/;
  return regExp.test(link);
}
