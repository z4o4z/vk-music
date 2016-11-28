export default function(state, data) {
	const items = {};

	Object.keys(data).forEach(key => items[key] = state[key] || {...data[key]});

	return items;
}
