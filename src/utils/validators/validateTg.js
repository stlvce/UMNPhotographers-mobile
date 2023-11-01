export default function (tg) {
  const regExp = /^(@?)+[a-z0-9]+$/;

  let tgName = "";
  const regExpLink = /^https:\/\/t\.me\/[a-z0-9]+$/;
  if (regExpLink.test(tg)) {
    tgName = tg.replace("https://t.me/", "");
    return tgName.length >= 5;
  }

  return tg.length >= 5 && regExp.test(tg);
}
