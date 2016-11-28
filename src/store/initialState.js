export default {
	vk: {
		initialized: false,
		authorized: false,
		authorizing: true,
		authorizeError: null,
		userId: null,
		expire: 0
	},

	ui: {
		isLeftMenuOpen: false
	},

	users: {},

	entities: {},

	groups: {},

	player: {
		playlist: [],
		current: 0,
		next: 0,
		prev: 0,
		isPlaying: false,
		isRepeating: false,
		isShuffling: false
	}
};
