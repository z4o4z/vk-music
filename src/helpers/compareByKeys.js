export default function compareByKeys(obj1, obj2, ...keys) {
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i];

    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}
