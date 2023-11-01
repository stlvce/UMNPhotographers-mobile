export default function (vk) {
  const regExp = /^(@?)+[a-z0-9]+$/;

  let vkName = "";
  const regExpLink = /^https:\/\/vk\.com\/[a-z0-9]+$/;
  if (regExpLink.test(vk)) {
    vkName = vk.replace("https://vk.com/", "");
    return vkName.length >= 5;
  }

  return vk.length >= 5 && regExp.test(vk);
}
