export default function normalizeBy(data, by) {
  let normalized = {};
  let ids = [];

  data.forEach(item => {
    if (typeof item !== 'object') {
      return;
    }

    ids.push(item[by]);
    normalized[item[by]] = item;
  });

  return {
    normalized,
    ids
  };
}
