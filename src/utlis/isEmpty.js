/**
 * Checks if a value is empty.
 *
 * @param {*} value The value to check.
 * @returns {boolean} True if the value is empty, otherwise false.
 */
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
