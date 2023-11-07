export default function (link) {
  const regExp = /^(http|https)+:\/\/+[a-z]+\.+[a-z]+(\/?)+([a-z]?)+$/;
  return regExp.test(link);
}
