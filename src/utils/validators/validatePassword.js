export default function (password) {
  const PASS_REGEXP = /^[A-Za-z0-9]+$/;
  return password?.length >= 6 && PASS_REGEXP.test(password);
}
