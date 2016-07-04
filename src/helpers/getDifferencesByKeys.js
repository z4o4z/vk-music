import compareByKeys from './compareByKeys';

export default function getDifferencesByKeys(obj1, obj2, ...keys) {
  let differences = {};

  for (let id in obj2) {
    if (!obj2.hasOwnProperty(id)) {
      continue;
    }

    let audio = obj2[id];

    if (!obj1[id] || !compareByKeys(obj1[id], audio, ...keys)) {
      differences[id] = audio;
    }
  }

  if (Object.keys(differences).length) {
    return differences;
  }

  return false;
}
