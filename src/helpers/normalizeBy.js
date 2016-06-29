export default function normalizeBy(data, by) {
  let normalized = {};
  let ids = [];

  data.forEach(item => {
    ids.push(item[by]);
    normalized[item[by]] = item;
  });

  return {
    normalized,
    ids
  };
}
