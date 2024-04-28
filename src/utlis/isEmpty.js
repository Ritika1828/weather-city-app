export default function isEmpty(val) {
  if (
    val === '' ||
    val === null ||
    val === undefined ||
    (typeof val === 'object' && Object.keys(val).length === 0)
  ) {
    return true;
  }

  return false;
}
