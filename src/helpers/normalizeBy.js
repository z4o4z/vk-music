export default function normalizeBy(arr, by) {
	let normalized = {};
	let ids = [];

	arr.forEach(item => {
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

export function normalizeByAndMakeCID(arr, by, prefix) {
	let normalized = {};
	let ids = [];

	arr.forEach(item => {
		if (typeof item !== 'object') {
			return;
		}

		item.cid = item[prefix] + '_' + item[by];

		ids.push(item.cid);
		normalized[item.cid] = item;
	});

	return {
		normalized,
		ids
	};
}
