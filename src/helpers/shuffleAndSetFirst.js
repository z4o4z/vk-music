import shuffle from 'lodash/shuffle';

export default function(arr, first) {
	arr.splice(arr.indexOf(first), 1);

	return [first, ...shuffle(arr)];
}
