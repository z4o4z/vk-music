export default function isArrayStartFrom(array, startFrom) {
  if (array.length < startFrom.length) {
    return false;
  }

  for (let i = 0; i < startFrom.length; i++) {
    if (array[i] !== startFrom[i]) {
      return false;
    }
  }

  return true;
}
