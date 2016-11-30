export default function(type, options) {
	const res = options[type] || options['default'];

	if (typeof res === 'function') {
		return res();
	}

	return res;
}
